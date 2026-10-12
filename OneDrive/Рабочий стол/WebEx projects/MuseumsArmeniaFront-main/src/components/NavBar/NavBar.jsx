import React, { useCallback, useEffect, useState } from "react";
import NavMenu from "../NavMenu/NavMenu";
import { logo } from "../../images/images";
import "./NavBar.css";
import ChangeFontSize from "../ChangeFontSize/ChangeFontSize";
import SelectLng from "../SelectLng/SelectLng";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getLogOut } from "../../store/slices/LogOutSlice/LogOutApi";
import { getAuthUser, getIsAuth } from "../../store/slices/Auth/AuthSlice";
import { logOutIcon, userIcon } from "../../iconFolder/icon";
import ShopCard from "../../images/Bank.svg";
import {
  getProductLength,
  getSetBasketData,
  setModalIsOpenShop,
} from "../../store/slices/Shop/ShopSlice";
import { getShopIconBasketDatas } from "../../store/slices/Shop/ShopApi";

function NavBar({ changeFonSize, changeFont, homeNavColor }) {
  const { t, i18n } = useTranslation();
  const isAuth = useSelector(getIsAuth);
  const isAuthCount = useSelector(getAuthUser);
  const leng =
    localStorage.getItem("lang") != null ? localStorage.getItem("lang") : "am";
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  // /////////////shop length/////////////////
  const productLength = useSelector(getProductLength);
  // //////////////end shop length///////////////////////

  const handleLogOut = async () => {
    dispatch(getLogOut());
  };
  const handleClickOpenModal = useCallback((e) => {
    e.stopPropagation();
    dispatch(setModalIsOpenShop(true));
    dispatch(getShopIconBasketDatas());
  }, []);

  // const navBarStyle = pathname === `/${leng}/` ? {
  //     background: homeNavColor ? 'black' : 'transparent',
  //     opacity: homeNavColor ? '.7' : '1',
  //   } : {}

  return (
    <div className="nav_bar">
      <div className="container">
        <div className="nav_bar_left_div">
          <NavLink to={`/${leng}/`}>
            <img src={logo} alt="logo" className="nav_bar_logo_" />
          </NavLink>
          <NavMenu />
        </div>

        <div className="nav_bar_right_div">
          {isAuth && (
            <div className="shopIconDiv" onClick={handleClickOpenModal}>
              <span className="shopIconLength">
                {productLength || isAuthCount.card_count}
              </span>
              <img src={ShopCard} alt="shop-card" className="shop-card" />
            </div>
          )}

          {isAuth && (
            <Link to={`/${leng}/profilePage`}>
              <div>{userIcon}</div>
            </Link>
          )}
          <ChangeFontSize {...{ changeFonSize, changeFont }} />
          <SelectLng />
          {!isAuth && <NavLink to={`/${leng}/login`}>{t("login_btn")}</NavLink>}
          {isAuth && <span onClick={handleLogOut}>{logOutIcon}</span>}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
