import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CustomSearshBlock } from '../../index';
import { getMuseumOneProducts } from '../../../../store/slices/MuseumPagesSlice/MuseumPagesApi';
import ProductsBlock from './ProductsBlock';
import LoadSpinner from '../../../LoadSpinner/LoadSpinner';
import CustopPagination from '../../CustopPagination';

import './museumOneShop.css';
const MuseumOneShop = ({ museumId }) => {
   const { t, i18n } = useTranslation();
   const needToShow = useRef(0)
   const dispatch = useDispatch();
   const [activCategoru, setActivCategoru] = React.useState({
      name: t(`selectCategory`),
      type: null,
      id: null,
   });
   const [pageCount, setPageCount] = React.useState(1);
   const { dataMuseumProducts, loadingMuseumProducts } = useSelector((state) => state.museumPages);

   const filter = React.useCallback((obj) => {
      setActivCategoru(obj);
      setPageCount(1);
   }, []);
   const onChangePag = React.useCallback((count) => {
      setPageCount(count);
      // dispatch(getMuseumOneProducts({ museumId: museumId, productId: obj.id }));
   }, []);

   React.useEffect(() => {
      dispatch(
         getMuseumOneProducts({ museumId: museumId, productId: activCategoru.id, pageCount }),
      );
   }, [pageCount, activCategoru]);


   useEffect(() => {
      if (dataMuseumProducts.dataProducts.length) {
         needToShow.current = needToShow.current + 1
      }
   }, [dataMuseumProducts.dataProducts.length])



   return (
      <div className="museumOne_pageStyle">
         {loadingMuseumProducts === 'fulfilled' ? (
            <div className="MuseumOneShop-par">
               {(dataMuseumProducts.dataProducts.length > 0 || needToShow.current) && <div className="MuseumOneShop-parHeader">
                  <div>
                     <h4 className="museumOne_title">{t(`thisMuseum`)}</h4>
                     <p>
                        {t(`Showing.0`)} {dataMuseumProducts.dataProducts.length > 0 ? '1-' : ''}
                        {dataMuseumProducts.dataProducts.length} {t(`Showing.1`)}{' '}
                        {dataMuseumProducts.totalCount} {t(`Showing.2`)}
                     </p>
                  </div>
                  <CustomSearshBlock
                     arr={dataMuseumProducts.products_category}
                     activ={activCategoru}
                     fun={filter}
                     translationtxt={['selectCategory', 'allMussseum']}
                  />
               </div>}
               {dataMuseumProducts.dataProducts.length > 0 && (
                  <>
                     <div className="MuseumOneShop-parProducts">
                        {dataMuseumProducts.dataProducts.map((item) => (
                           <ProductsBlock {...item} key={item.id} />
                        ))}
                     </div>
                     {dataMuseumProducts.totalCount > 12 && (
                        <div className="MuseumOneShop-pagination">
                           <CustopPagination
                              pageCount={pageCount}
                              allpageCount={dataMuseumProducts.pageCount}
                              onChangePag={onChangePag}
                           />
                        </div>
                     )}
                  </>
               )
                  // : (
                  //    <div className="productsErrorMessages">
                  //       <p>{t(`productsErrorMessages`)}</p>
                  //    </div>
                  // )
               }
            </div>
         ) : loadingMuseumProducts === 'loading' ? (
            <LoadSpinner />
         ) : (
            ''
         )}
      </div>
   );
};

export default React.memo(MuseumOneShop);
