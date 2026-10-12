import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './NavMenuItem.css';
import { useTranslation } from 'react-i18next';

function NavMenuItem({ txt, path }) {
  const { t } = useTranslation();
  const location = useLocation();
  const leng = localStorage.getItem('lang') || 'am';

  const isActive = location.pathname === `/${leng}${path}`;

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 100,
    });

  };

  return (
    <li className='nav_menu_item'>
      <NavLink className={isActive ? 'active-item' : ''} to={`/${leng}${path}`} onClick={handleScrollTop}>
        {t('navMenuItems.' + txt)}
      </NavLink>
    </li>
  );
}

export default NavMenuItem;
