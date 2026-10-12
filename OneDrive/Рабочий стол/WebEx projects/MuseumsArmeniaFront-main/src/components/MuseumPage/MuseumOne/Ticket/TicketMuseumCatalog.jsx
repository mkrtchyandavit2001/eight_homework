import React, { memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
   setDataItems,
   setTicketType,
   setModalTicketIsOpen,
   setResetDataItems,
} from '../../../../store/slices/MuseumTicket/MuseumTicketSlice';
import { customBasesUrlFunc } from '../../customBasesUrlFunc';
import { setModalIsOpenShop } from '../../../../store/slices/Shop/ShopSlice';
import { postMuseumTicket } from '../../../../store/slices/MuseumTicket/MuseumTicketApi';
import { postTicketCart } from '../../../../store/slices/Shop/ShopApi';
import { BuyTicketBlock, AbonementTicketBlock } from './index';
import ButtonSecond from '../../../ButtonSecond/ButtonSecond';

const TicketMuseumCatalog = () => {
   const dispatch = useDispatch();
   const [t] = useTranslation();
   const navigate = useNavigate();
   const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';
   const { ticketType, dataItems } = useSelector((state) => state.museumTicket);
   const { isAuth } = useSelector((store) => store.auth);

   const hendleClickItems = useCallback(
      (dovnUp, obj) => {
         dispatch(setDataItems({ dovnUp, obj }));
      },
      [dispatch],
   );

   const HendleBuyTicket = useCallback(() => {
      if (!dataItems.length) return;

      if (isAuth) {
         const userToken = localStorage.getItem('token');
         dispatch(
            postMuseumTicket({
               userToken,
               postData: {
                  request_name: 'web',
                  items: dataItems,
                  redirect_url: customBasesUrlFunc().baseUrl,
               },
            }),
         );
      } else {
         // պահում ենք նախկին ticketType-ի դաշտերը (այդ թվում՝ ticketType.ticketType)
         dispatch(setTicketType({ ...ticketType, kindOf: 'form' }));
      }
   }, [dataItems, isAuth, ticketType, dispatch]);

   const HendleAddCart = useCallback(async () => {
      if (!dataItems.length) return;

      if (!isAuth) {
         navigate(`/${leng}/login`);
         return;
      }

      try {
         // սպասում ենք backend-ի պատասխանին, նոր միայն փակում ենք modal-ը
         await dispatch(postTicketCart({ type: 'ticket', items: dataItems })).unwrap();
         dispatch(setModalTicketIsOpen(false));
         dispatch(setResetDataItems());
         dispatch(setModalIsOpenShop(true));
      } catch (err) {
         console.error('postTicketCart failed:', err);
         // modal-ը մնում է բաց, dataItems-ը՝ պահված
      }
   }, [dataItems, isAuth, navigate, leng, dispatch]);

   return (
      <div className="TicketMuseumCatalog-parent">
         <div className="TicketMuseumCatalog-header" style={{ textAlign: 'center' }}>
            <p>{ticketType.type === 'Buy Ticket' ? t(`infoBuyTicket.5`) : t(`infoBuyTicket.6`)}</p>
         </div>
         <div>
            {ticketType.type === 'Buy Ticket' ? (
               <BuyTicketBlock hendleClickItems={hendleClickItems} />
            ) : (
               <AbonementTicketBlock hendleClickItems={hendleClickItems} />
            )}
         </div>
         <div className="TicketMuseumCatalog-buttonBlock">
            <ButtonSecond
               txt="0"
               background={'#D5AA72'}
               color={'#FFFFFF'}
               boxShadow={'none'}
               fontSize="12px"
               newClass="newStyleBtn"
               onClick={HendleBuyTicket}
               countsBtn={true}
            />
            <ButtonSecond
               txt="12"
               background={'#D5AA72'}
               color={'#FFFFFF'}
               boxShadow={'none'}
               fontSize="12px"
               newClass="newStyleBtn"
               onClick={HendleAddCart}
               isShow="cart"
               countsBtn={true}
            />
         </div>
      </div>
   );
};

export default memo(TicketMuseumCatalog);