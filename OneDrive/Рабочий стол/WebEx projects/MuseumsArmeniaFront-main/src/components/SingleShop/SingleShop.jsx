import React, { useCallback, useEffect, useState } from 'react';
import './SingleShop.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSingleDataShop,
  postShopCardData,
  postSingleShopCardData,
} from '../../store/slices/Shop/ShopApi';
import {
  getLoadingShop,
  getSingleShopDatas,
  getSingleShopLoading,
  setBasketData,
  setModalIsOpenShop,
} from '../../store/slices/Shop/ShopSlice';
import ButtonSecond from '../ButtonSecond/ButtonSecond';
import { useTranslation } from 'react-i18next';
import CardModal from '../Shop/CardModal';
import { getIsAuth } from '../../store/slices/Auth/AuthSlice';
import minusBtn from '../../images/minusBtn.png';
import plusBtn from '../../images/plusBtn.png';

function SingleShop() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const IsAuth = useSelector(getIsAuth);
  const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';
  const params = useParams();
  const dispatch = useDispatch();
  const singleShopDatas = useSelector(getSingleShopDatas);
  const loading = useSelector(getSingleShopLoading);


  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getSingleDataShop(params.id));
  }, []);

  const SinglePage = (idd) => {
    navigate(`/${leng}/store/${idd}`);
    dispatch(getSingleDataShop(idd));
  };
  ////////////////////////////
  const [number, setNumber] = useState(1);

  const handleIncrement = () => {
    setNumber((prevNumber) =>
      prevNumber < singleShopDatas.quantity ? prevNumber + 1 : prevNumber,
    );
  };

  const handleDecrement = () => {
    setNumber((prevNumber) => (prevNumber > 1 ? prevNumber - 1 : prevNumber));
  };
  console.log('numbernumber', number);

  const handleClickOpenModal = useCallback(
    (id, image, name, price, museumName, productCount) => {
      return (e) => {
        e.stopPropagation();
        console.log('productCount', productCount);
        const count = productCount !== undefined ? productCount : 1;
        if (IsAuth) {
          dispatch(setModalIsOpenShop(true));
          dispatch(postSingleShopCardData({ id, productCount: count }));
        } else {
          // setErrorText(true);
          navigate(`/${leng}/login`);
        }
        
      };
    },
    [IsAuth],
  );
  console.log('singleShopDatas', singleShopDatas);

  return (
    <>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
          loading...
        </div>
      ) : (
        <div className="all_singleShopp">
          <div className="container">

            <div className='lines_div_event'>
              <div>
                <img src={require('../../images/Line 106.png')} alt="" />
                <h2>{t('shop_page_title.0')}</h2>
                <img src={require('../../images/Line 106.png')} alt="" />
              </div>
            </div>

            <div className="singleShop_All">
             
              <div className="singleShop_top">
                <img
                  src={singleShopDatas.image}
                  alt={singleShopDatas.name}
                  className="singleShop_top_image"
                />
                <div className="singleShop_top_right">
                  <h2>{singleShopDatas.name}</h2>
                  <p>{singleShopDatas.museum_name}</p>
                  <p style={{ color: '#00000080' }}>{t('single_shop.0')} {singleShopDatas.quantity}</p>
                  <div className="number_and_button">
                    <p className="singleShop_top_right_kategoria">
                      {t('single_shop_page.1')}: {singleShopDatas.product_category_id}
                    </p>
                    <div className="plus_minus_btns">
                      <img
                        src={minusBtn}
                        alt="minusBtn"
                        className="minusBtnnn"
                        onClick={handleDecrement}
                      />
                      <span>{number}</span>
                      <img
                        src={plusBtn}
                        alt="plusBtn"
                        className="plusBtnnn"
                        onClick={handleIncrement}
                      />
                    </div>
                   
                    <p className="singleShop_top_right_price">
                      {t('single_shop.1')}{' '}
                      <span className="price_color">
                        {singleShopDatas.price} {t('single_shop_page.0')}
                      </span>
                    </p>
                    <div
                      className="shop-box_button"
                      onClick={handleClickOpenModal(
                        singleShopDatas.id,
                        singleShopDatas.image,
                        singleShopDatas.name,
                        singleShopDatas.price,
                        singleShopDatas.museum_name,
                        number,
                      )}>
                      {t('buttons.3')}

                    </div>
                   
                  </div>
                </div>
              </div>
              <div className="singleShop_bottom">
                <h3 className="singleShop_bottom_title">{t('single_shop_page.2')}</h3>
                <div className="singleShop_bottom_divs">
                  {singleShopDatas?.similar_products && singleShopDatas.similar_products.length != 0
                    ? singleShopDatas.similar_products.map((el, index) => (
                      <div
                        className="shop-box-singleShop"
                        key={index}
                        onClick={() => SinglePage(el.id)}>
                        <div className="shop-box_img_singleShop">
                          <img src={el.image} alt={el.image} />

                          <div className="souvenir_item_add_cart_div">
                            <div
                              className="shop-box_button"
                              onClick={handleClickOpenModal(
                                el.id,
                                el.image,
                                el.name,
                                el.price,
                                el.museum_name,
                              )}>
                              {t('buttons.3')}
                            </div>
                          </div>
                        </div>

                        <div className="shop-box_texts_div">
                          <p className="shop-box-title">
                            {el.name?.length > 35 ? el.name.slice(0, 35) + '...' : el.name}
                          </p>
                          <p className="shop-box-price">{el.price}</p>
                        </div>
                      </div>
                    ))
                    : t('single_shop_page.3')}
                </div>
              </div>
            </div>
            <CardModal />
          </div>
        </div>
      )}
    </>
  );
}

export default SingleShop;
