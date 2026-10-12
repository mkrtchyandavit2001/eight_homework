import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { filterRegionMuseum } from '../../store/slices/MuseumPagesSlice/MuseumPagesSlice';
import { LocationIcon } from '../../iconFolder/icon';

import { CustomSearshBlock } from './index';

const SearchBlockMuseumPage = ({ regions }) => {
   const dispatch = useDispatch();
   const { t, i18n } = useTranslation();
   const [activRegion, setActivRegion] = React.useState({
      name: t(`RegionsMussseum`),
      type: null,
      id: null,
   });

   const region = regions.map((el, idx) => {
      return {
         key: el,
         id: idx + 1,
      };
   });

   const filter = React.useCallback((obj) => {
      setActivRegion(obj);
      dispatch(filterRegionMuseum(obj));
   }, []);

   return (
      <div className="parent_searchBlock">
         <div style={{ width: '100%', position: 'relative' }}>
            {/* <div className="parent_searchBlock-title">
               <FilterIcon />
               <p>{t(`musseumPage_title.1`)}</p>
            </div> */}
            <CustomSearshBlock
               fun={filter}
               activ={activRegion}
               arr={region}
               Icon={LocationIcon}
               translationtxt={['RegionsMussseum', 'allMussseum']}
            />
         </div>
      </div>
   );
};

export default memo(SearchBlockMuseumPage);
