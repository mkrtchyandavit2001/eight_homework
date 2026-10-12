import React, { useEffect, useRef, useState } from 'react';
import './ComboTicket.css';
import { useDispatch, useSelector } from 'react-redux';
import { getComboTickets } from '../../store/slices/ComboTicket/ComboTicketApi';
import {
   getAllComboTickets,
   getLoadingComboTickets,
   setClickComboTicketData,
} from '../../store/slices/ComboTicket/ComboTicketSlice';
import location from '../../images/location.png';
import minusBtn from '../../images/minusBtn.png';
import plusBtn from '../../images/plusBtn.png';
import { getIsAuth } from '../../store/slices/Auth/AuthSlice';
import { TicketMuseumBlock } from '../MuseumPage/MuseumOne/Ticket';
import {
   setModalTicketIsOpen,
   setTicketType,
} from '../../store/slices/MuseumTicket/MuseumTicketSlice';
import { postMuseumTicket } from '../../store/slices/MuseumTicket/MuseumTicketApi';
import { postComboTickets } from '../../store/slices/Shop/ShopApi';
import { useNavigate } from 'react-router-dom';
import { setModalIsOpenShop } from '../../store/slices/Shop/ShopSlice';
import CardModal from '../Shop/CardModal';
import { useTranslation } from 'react-i18next';
import LoadSpinner from '../LoadSpinner/LoadSpinner';

function ComboTicket() {
   const { t, i18n } = useTranslation();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';
   const IsAuth = useSelector(getIsAuth);
   const ComboTickets = useSelector(getAllComboTickets);
   const loading = useSelector(getLoadingComboTickets);
   const [selectedItemIds, setSelectedItemIds] = useState([]);
   const [totalPrice, setTotalPrice] = useState(0);
   const [count, setCount] = useState(1);
   const [btnColor, setBtnColor] = useState(false);
   const privateTicketRegions = t('privateTicketRegions', { returnObjects: true });
   const [ticketObj, setObj] = useState({
      museum_ids: [],
      type: null,
      quantity: null,
   });

   useEffect(() => {
      dispatch(getComboTickets());
      window.scrollTo({
         top: 0,
         left: 100,
      });
   }, []);

   useEffect(() => {
      const newTotalPrice = selectedItemIds.reduce((acc, itemId) => {
         const selectedItem = ComboTickets.data.find((el) => el.id === itemId);
         if (selectedItem) {
            return acc + count * selectedItem.tickets[0].price;
         }
         return acc;
      }, 0);

      setTotalPrice(newTotalPrice);
   }, [selectedItemIds, ComboTickets.data, count]);

   const handleItemClick = (itemId, pricee) => {
      setSelectedItemIds((prevIds) => {
         const isItemAlreadySelected = prevIds.includes(itemId);
         if (isItemAlreadySelected) {
            setTotalPrice((prevPrice) => prevPrice - count * pricee);
            return prevIds.filter((id) => id !== itemId);
         } else {
            setTotalPrice((prevPrice) => prevPrice + count * pricee);
            return [...prevIds, itemId];
         }
      });
   };

   const plusButton = () => {
      setCount((prevCount) => {
         if (prevCount < ComboTickets.params.max_ticket_quantity) {
            const newCount = prevCount + 1;
            return newCount;
         } else {
            return ComboTickets.params.max_ticket_quantity;
         }
      });
   };

   const minusButton = () => {
      setCount((pre) => (pre > 1 ? pre - 1 : 1));
   };

   useEffect(() => {
      setObj({ ...ticketObj, quantity: count });
   }, [count]);

   const addMuseumTickets = () => {
      if (ticketObj.museum_ids.length >= ComboTickets.params.min_museum_quantity) {
         setBtnColor(true);
         dispatch(setClickComboTicketData(ticketObj));
         if (IsAuth) {
            console.log('paymenti ej');
            let token = localStorage.getItem('token');
            dispatch(
               postMuseumTicket({
                  userToken: token,
                  postData: {
                     request_name: 'web',
                     items: [ticketObj],
                  },
               }),
            );
         } else {
            dispatch(setModalTicketIsOpen(true));
            dispatch(
               setTicketType({
                  kindOf: 'form',
                  type: 'By ticket',
                  ticketType: 'combo',
               }),
            );
         }
      }
   };

   const test = (obj) => {
      const resFind = ticketObj.museum_ids.find((el) => el === obj.id);

      if (resFind) {
         const newArr = ticketObj.museum_ids.filter((el) => el !== obj.id);
         // console.log(newArr, 599999955);
         setObj({ ...ticketObj, museum_ids: newArr });
      } else {
         setObj({
            museum_ids: [...ticketObj.museum_ids, obj.id],
            type: obj.tickets[0].type,
            quantity: count,
         });
      }
   };

   const addMuseumTicketsToBasket = () => {
      if (IsAuth) {
         dispatch(setModalIsOpenShop(true));
         dispatch(
            postComboTickets({
               selectedItemIds: selectedItemIds,
               count: count,
            }),
         );
      } else {
         navigate(`/${leng}/login`);
      }
   };

   const allowedIds = [1, 2, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 26];

   
   return (
      <>
         {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
               <LoadSpinner fullBackColor="white" />
            </div>
         ) : (
            <div className="ComboTicket_all">
               <div className="container">
                  <div className="ComboTicket_topDiv">
                     <div className="ComboTicket_topDiv_div">
                        <img
                           className="border_1"
                           src={require('../../images/LineGold.png')}
                           alt="LineGold"
                        />
                        <h2 className="ComboTicket_topDiv_div_title">{t('ticketsType.2')}</h2>
                        <img
                           className="border_2"
                           src={require('../../images/LineGold.png')}
                           alt="LineGold"
                        />
                     </div>
                     <div className="ComboTicket_topDiv_text">
                        <p>
                           {t('section_united_ticket.0')} {ComboTickets.params.min_museum_quantity}{' '}
                           {t('section_united_ticket.1')} {ComboTickets.params.discount_percent}{' '}
                           {t('section_united_ticket.2')}
                        </p>

                        <span>{t('united_ticketPage_title')}</span>
                        {selectedItemIds.length > 0 && <span>{t('united_ticketPage_selectedItems.0') } {selectedItemIds.length} {t('united_ticketPage_selectedItems.1')}</span>}
                     </div>
                  </div>

                  {selectedItemIds.length >= ComboTickets.params.min_museum_quantity ? (
                     <div className="ticketBuyCard_all">
                        <div className="ticketBuyCard">
                           <div className="ticketBuyCard_top">
                              <div className="ticketBuyCard_top_div">
                                 <img
                                    src={minusBtn}
                                    alt="minusBtn"
                                    className="ticketBuyCard_minusBtn"
                                    onClick={() => minusButton()}
                                 />
                                 <span>{count}</span>
                                 <img
                                    src={plusBtn}
                                    alt="plusBtn"
                                    className="ticketBuyCard_plusBtn"
                                    onClick={() => plusButton()}
                                 />
                              </div>
                              <p>{totalPrice} AMD</p>
                           </div>
                           <div className="ticketBuyCard_bottom">
                              <div className="ticketBuyCard_bottom_btn" onClick={addMuseumTickets}>
                                 {t('buttons.9')}
                              </div>
                              <div
                                 className="ticketBuyCard_bottom_btn"
                                 onClick={addMuseumTicketsToBasket}>
                                 {t('buttons.3')}
                              </div>
                           </div>
                        </div>
                     </div>
                  ) : (
                     ''
                  )}

                  <div className="ComboTickets_bottom_all">
                     {ComboTickets.data.map((el, index) =>
                        allowedIds.includes(el.id) && ( 
                           <div
                              key={index}
                              className={`ComboTickets_bottom ${selectedItemIds.includes(el.id) ? 'selected' : ''
                                 }`}
                              onClick={() => {
                                 handleItemClick(el.id, el.tickets[0].price);
                                 test(el);
                              }}>
                              <div className="ComboTickets_bottom_img">
                                 <img src={el.image} alt={el.name} />
                              </div>
                              <div className="ComboTickets_bottom_location">
                                 <img src={location} alt="location" />
                                 {privateTicketRegions.map((item, index) =>
                                    Object.keys(item)[0] === el.region_name ? (
                                       <span key={index}> {Object.values(item)[0]}</span>
                                    ) : (
                                       ''
                                    ),
                                 )}
                              </div>
                              <div className="ComboTickets_bottom_blueBox">
                                 <div className="ComboTickets_bottom_blueBox_div">
                                    <p style={{ width: '250px' }}>{el.name}</p>
                                    <div className="ComboTickets_bottom_blueBox_div_round"></div>
                                 </div>
                                 <p className="ComboTickets_bottom_blueBox_price">
                                    {el.tickets[0].price} AMD
                                 </p>
                              </div>
                           </div>
                        )
                     )}
                  </div>
               </div>
               <TicketMuseumBlock />
               <CardModal />
            </div>
         )}
      </>
   );
}

export default ComboTicket;
