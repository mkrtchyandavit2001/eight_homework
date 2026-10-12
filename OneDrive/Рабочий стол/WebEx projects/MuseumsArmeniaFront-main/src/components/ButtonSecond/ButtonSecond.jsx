import React from 'react';
import './ButtonSecond.css';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsAuth } from '../../store/slices/Auth/AuthSlice';

function ButtonSecond({
   countsBtn,
   isShow,
   txt,
   path,
   minWidth = '',
   maxWidth = '',
   onClick = () => {},
   background = '',
   color = '',
   boxShadow = '',
   fontSize = '',
   newClass = '',
}) {
   const lang = localStorage.getItem('lang');
   const dataItems = useSelector((state) => state.museumTicket.dataItems);
   const isAuth = useSelector(getIsAuth);
   const { t } = useTranslation();

   if (path) {
      return (
         <NavLink to={`/${lang}/${path}`}>
            <button className="btn_2 draw-border_2">{t('buttons.' + txt)}</button>
         </NavLink>
      );
   }

   const hasSelectedTickets = dataItems.some((item) => item.quantity > 0);

   const isDisabled = () => {
      if (!countsBtn) return false;
      if (!hasSelectedTickets) return true;
      // «Զամբյուղ» կոճակը հասանելի է միայն մուտք գործածներին
      if (isShow === 'cart' && !isAuth) return true;
      return false;
   };

   return (
      <button
         disabled={isDisabled()}
         onClick={onClick}
         style={{
            minWidth,
            maxWidth,
            background,
            color,
            boxShadow,
            fontSize,
         }}
         className={`btn_2 draw-border_2 ${newClass}`}>
         {t('buttons.' + txt)}
      </button>
   );
}

export default ButtonSecond;