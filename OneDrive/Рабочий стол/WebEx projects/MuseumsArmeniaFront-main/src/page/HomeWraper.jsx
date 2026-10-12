import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import BurgerMenu from '../components/BurgerMenu/BurgerMenu';
import FooterComponent from '../components/FooterComponent/FooterComponent';
import CardModal from '../components/Shop/CardModal';
import { getCardErrorModal, getErrorMessage, getSetModalIsOpenShop, setCardErrorModal } from '../store/slices/Shop/ShopSlice';
import { useDispatch, useSelector } from 'react-redux';
import ScrollUpButton from '../components/ScrollUpButton/ScrollUpButton';
import CardNotificationModal from '../components/CardNotificationModal/CardNotificationModal';

function HomeWraper({ changeFonSize, changeFont }) {
  const { pathname } = useLocation();
  const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';
  const ModalIsOpenShop = useSelector(getSetModalIsOpenShop);
  const [homeNavColor, setHomeNavColor] = useState(false);
  const getErrorCard = useSelector(getErrorMessage)
  const cardErrorModal = useSelector(getCardErrorModal)
  const dispatch = useDispatch()
  
  useEffect(() => {
    window.addEventListener('scroll', (e) => {
        if (window.scrollY > 0) {
          setHomeNavColor(true);
        } else {
          setHomeNavColor(false);
        }
    });
    window.scrollTo(0, 0);
  }, [homeNavColor]);
  
  useEffect(() => {
    if (cardErrorModal) {
      const timeout = setTimeout(() => {
        dispatch(setCardErrorModal(false));
      }, 3000); // Modal will disappear after 3 seconds
      return () => clearTimeout(timeout);
    }
  }, [cardErrorModal]);
  

  return (
    <div className="home_wraper">
      <NavBar {...{ changeFonSize, changeFont, homeNavColor}}/>
      {ModalIsOpenShop && <CardModal />}
      <BurgerMenu/>
      <Outlet />
      <ScrollUpButton/>
      <FooterComponent />
      {cardErrorModal && <CardNotificationModal message={getErrorCard.message}/>}
    </div>
  );
}

export default HomeWraper;
