import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ProductsBlock = ({ id, image, price, name }) => {
   const { t, i18n } = useTranslation();
   const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';
   return (
      <div className="ProductsBlock">
         <div className="ProductsBlock-img">
            <img src={image} alt="images products" />
         </div>
         <div className="ProductsBlock-description">
            <p className="ProductsBlock-description-title">{name.slice(0, 30)}</p>
            <p className="ProductsBlock-description-categoru"></p>
            <div className="ProductsBlock-description-parPrice">
               <p className="ProductsBlock-description-price">{price} ֏</p>

               {/* <ShopMinIcons /> */}
            </div>
            <Link to={`/${leng}/store/${id}`}>
               <button className="ProductsBlock-description-btn">{t(`buy`)} </button>
            </Link>
         </div>
      </div>
   );
};

export default React.memo(ProductsBlock);
