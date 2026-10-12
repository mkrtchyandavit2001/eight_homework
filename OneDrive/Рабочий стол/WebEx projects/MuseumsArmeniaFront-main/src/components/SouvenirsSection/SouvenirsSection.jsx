import React, { useCallback, useEffect, useRef } from 'react';
import { responsive, responsive2, souvenirsData } from '../../data/data';
import 'react-multi-carousel/lib/styles.css';
import './SouvenirsSection.css';
import Carousel from 'react-multi-carousel';
import ButtonSecond from '../ButtonSecond/ButtonSecond';
import { starIcon } from '../../iconFolder/icon';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getSouvinersProd } from '../../store/slices/SouvinersProdSlice/SouvinersProdApi';
import { selectSouvinersProd } from '../../store/slices/SouvinersProdSlice/SouvinersProdSlice';
import { getIsAuth } from '../../store/slices/Auth/AuthSlice';
import { setModalIsOpenShop } from '../../store/slices/Shop/ShopSlice';
import { postShopCardData } from '../../store/slices/Shop/ShopApi';
import { useNavigate } from 'react-router-dom';

function SouvenirsSection() {
  const navigate = useNavigate();
  const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';
  const { t, i18n } = useTranslation();
  const IsAuth = useSelector(getIsAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSouvinersProd());
  }, []);

  const respProd = useSelector(selectSouvinersProd);

  const handleClickOpenModal = useCallback((id, image, name, price, museumName) => {
    return (e) => {
      e.stopPropagation();
      console.log('IsAuth', IsAuth);
      if (IsAuth) {
        dispatch(setModalIsOpenShop(true));
        dispatch(postShopCardData({ id }));
      } else {
        // setErrorText(true);
        // window.location.href()
        // window.location.pathname = `/${leng}/login`;
        navigate(`/${leng}/login`)
      }
    };
  }, []);

  const product = respProd.data.map((el) => {
    return (
      <div
        key={el.id}
        onClick={() => navigate(`/${leng}/store/${el.id}`)}
        className="souvenir_item">
        <div className="souvenir_item_img_div">
          <img src={el.image} alt="souvenir" />

          <div className="souvenir_item_add_cart_div">
            <button className='souviner_item_btn'  onClick={handleClickOpenModal(el.id)}>{t('buttons.' + 3)}</button>
          </div>
        </div>

        <div className="souvenir_item_info_div">
          <p className='souvenir_item_info_div_name'>{el.name}</p>
          <p className='souvenir_item_info_div_price'>{el.price} AMD</p>
        </div>
      </div>
    );
  });
  return (
    <div className="souvenirss_section">
      <div className="container">
        

        <div className='lines_div_souviners'>
            <img src={require('../../images/line_gold.png')} alt="line" />
            <h2>{t('souvenirs_title.1')}</h2>
            <img src={require('../../images/line_gold.png')} alt="line" />
        </div>

        <div className="souvenir_items">
          <Carousel
            showDots={true}
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={4000}
            keyBoardControl={true}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px">
            {product}
          </Carousel>
        </div>
        <div className="souvenir_items_seeMore_button">
          <ButtonSecond txt="1" path={'store'} />

        </div>
      </div>
    </div>
  );
}

export default SouvenirsSection;
