import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSingleEvent, setIsActiveModal } from '../../store/slices/SingleEventSlice/SingleEventSlice';
import './SingleEventModal.css';
import TicketCountDiv from '../TicketCountDiv/TicketCountDiv';
import { useTranslation } from 'react-i18next';
import { getIsAuth } from '../../store/slices/Auth/AuthSlice';
import { postTicketCart } from '../../store/slices/Shop/ShopApi';
import { setModalIsOpenShop } from '../../store/slices/Shop/ShopSlice';
import { postBuyTicket } from '../../store/slices/BuyTicketSlice/BuyTicketApi';
import { setObj } from '../../store/slices/BuyTicketSlice/BuyTicketSlice';
import { setModalTicketIsOpen, setTicketType } from '../../store/slices/MuseumTicket/MuseumTicketSlice';
import { TicketMuseumBlock } from '../MuseumPage/MuseumOne/Ticket';

function SingleEventModal({ cartErrorMessage, setCartErrorMessage, currentItem }) {
    const respConfigSingleEvent = useSelector(selectSingleEvent);
    const [quantityEvent, setQuantityEvent] = useState([]);
    const [fullValueTicket, setFullValueTicket] = useState(0);
    const [errorMessageTicket, setErrorMessageTicket] = useState(false);
    const [totalTicketCount, setTotalTicketCount] = useState([]);
    const eventTypeRef = useRef(null)
    const totalValuesRef = useRef({});
    const isAuth = useSelector(getIsAuth);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const eventConfigs = currentItem?.event_configs || respConfigSingleEvent.data?.event_configs || [];

    // const f = (type) => {
    //     eventTypeRef.current = type
    //     console.log(eventTypeRef.current, 666);

    // }

    const updateTotalValue = (key, value) => {
        totalValuesRef.current[key] = value;
        const total = Object.values(totalValuesRef.current).reduce((acc, curr) => acc + curr, 0);
        setFullValueTicket(total);
    };

    const addCart = async (e) => {
        e.stopPropagation();
        if (isAuth) {
            if (currentItem?.style === "basic") {
                await dispatch(postTicketCart({
                    items: eventConfigs.map(el => {
                        return currentItem.all_prices.map(priceObj => ({
                            type: 'event-config',
                            id: el.id,
                            sub_type: priceObj.sub_type,
                            // price: priceObj.price,
                            quantity: sessionStorage.getItem(`quantity${el.id + priceObj.sub_type}`)
                        }));
                    }).flat().filter(el => el.quantity > 0)
                }));
            }
            else {
                await dispatch(postTicketCart({
                    items: currentItem.all_prices.map(priceObj => ({
                        type: 'event',
                        id: currentItem.id,
                        sub_type: priceObj.sub_type,
                        // price: priceObj.price,
                        quantity: sessionStorage.getItem(`quantity${currentItem.id + priceObj.sub_type}`)
                    })).flat().filter(el => el.quantity > 0)
                }));
            }
            dispatch(setModalIsOpenShop(true));
        }
        else {
            setCartErrorMessage(true);
            setTimeout(() => {
                setCartErrorMessage(false);
            }, 4000);
        }
    };

    const buyTicket = async (e) => {
        e.preventDefault();

        if (isAuth) {
            if (currentItem?.style === "basic") {
                await dispatch(postBuyTicket({
                    items: eventConfigs.map(el => {
                        return currentItem.all_prices.map(priceObj => ({
                            type: 'event-config',
                            id: el.id,
                            sub_type: priceObj.sub_type,
                            // price: priceObj.price,
                            quantity: sessionStorage.getItem(`quantity${el.id + priceObj.sub_type}`)
                        }));
                    }).flat().filter(el => el.quantity > 0)
                }))
                    .then(res => {
                        if (res.meta.requestStatus === "fulfilled") {
                            window.location.href = res.payload.data.redirect_url;
                        }
                    });
            }
            else {
                // if (sessionStorage.getItem(`quantity${currentItem.id}`) > 0) {
                await dispatch(postBuyTicket({
                    items: currentItem.all_prices.map(priceObj => ({
                        type: 'event',
                        id: currentItem.id,
                        sub_type: priceObj.sub_type,
                        // price: priceObj.price,
                        quantity: sessionStorage.getItem(`quantity${currentItem.id + priceObj.sub_type}`)
                    })).flat().filter(el => el.quantity > 0)
                }))
                    .then(res => {
                        if (res.meta.requestStatus === "fulfilled") {
                            window.location.href = res.payload.data.redirect_url;
                        }
                    });

                // }
            }
        } else {
            if (currentItem?.style === "basic") {
                const updatedItems = eventConfigs.map(el => {
                    return currentItem.all_prices.map(priceObj => ({
                        type: 'event-config',
                        id: el.id,
                        sub_type: priceObj.sub_type,
                        // price: priceObj.price,
                        quantity: sessionStorage.getItem(`quantity${el.id + priceObj.sub_type}`)
                    }));
                }).flat(); // Flatten the array of arrays into a single array

                // Filter items where quantity is greater than 0
                const filteredItems = updatedItems.filter(el => el.quantity > 0);

                console.log(filteredItems, 1111);

                if (filteredItems.length > 0) {
                    await dispatch(setObj({ items: filteredItems }));
                    await dispatch(setTicketType({ kindOf: 'form', type: 'Buy Ticket', ticketType: 'standart' }));
                    await dispatch(setModalTicketIsOpen(true));
                }
            }
            else {
                const filteredItems = currentItem?.all_prices.map(priceObj => ({
                    type: 'event',
                    id: currentItem.id,
                    sub_type: priceObj.sub_type,
                    // price: priceObj.price,
                    quantity: sessionStorage.getItem(`quantity${currentItem.id + priceObj.sub_type}`)
                })).flat().filter(el => el.quantity > 0)


                await dispatch(setObj({ items: filteredItems }));
                dispatch(setTicketType({ kindOf: 'form', type: 'Buy Ticket', ticketType: 'standart' }));
                dispatch(setModalTicketIsOpen(true));
            }
        }
    };

    console.log(currentItem, '888');

    return (
        <>
            <div className='single_event_modal'>
                <div className='single_event_modal_block'>
                    <span className='single_event_modal_block_xMark' onClick={() => dispatch(setIsActiveModal(false))}>X</span>
                    <div className='single_event_modal_items'>
                        {
                            currentItem?.style === "basic" ? eventConfigs.map(config =>
                                // <div key={config.id} className='single_event_modal_item'>
                                //     <div className='single_event_modal_item_left'>
                                //         <div className='single_event_modal_item_left_date_and_time'>
                                //             <div>
                                //                 <span>{t('event_single_page_modal.0')}</span>
                                //                 <span>{config.day}</span>
                                //             </div>
                                //             <div>
                                //                 <span>{t('event_single_page_modal.1')}</span>
                                //                 <span>{config.start_time.slice(0, 5)}</span>
                                //             </div>
                                //         </div>

                                //         {
                                //             currentItem?.all_prices.map((el, idx) => 

                                //                 <div className='single_event_modal_item_left_price_and_count'>
                                //                     <div className='single_event_modal_item_left_price_and_count_standart'>
                                //                         <div className='single_event_modal_item_left_price'>
                                //                             <span>{el.sub_type === 'standart' ? t('event_single_page_modal.2') : t('event_single_page_modal.4')}</span>
                                //                             <span className='single_event_modal_item_left_price_number'>{el?.price} AMD</span>
                                //                         </div>

                                //                         <TicketCountDiv
                                //                             max={config.tickets.max > 10 ? 10 : config.tickets.max}
                                //                             min={config.tickets.min}
                                //                             price={el?.price}
                                //                             setFullValueTicket={setFullValueTicket}
                                //                             setQuantityEvent={setQuantityEvent}
                                //                             quantityEvent={quantityEvent}
                                //                             totalTicketCount={totalTicketCount}
                                //                             setTotalTicketCount={setTotalTicketCount}
                                //                             item={config}
                                //                             // f={f}
                                //                             type={el.sub_type}
                                //                             updateTotalValue={updateTotalValue}
                                //                         />
                                //                     </div>


                                //                 </div>

                                //             )
                                //         }

                                //         <div className='single_event_modal_item_left_count'>
                                //             <span>{t('event_single_page_modal.3')}</span>
                                //             <span className='single_event_modal_item_left_count_number'>{config.tickets.max}</span>
                                //         </div>

                                //     </div>

                                // </div>


                                // =============changes=====================
                                <div key={config.id} className='single_event_modal_item'>
                                    <div className='single_event_modal_item_left'>
                                        <div className='single_event_modal_item_left_date_and_time'>
                                            <div>
                                                <span>{t('event_single_page_modal.0')}</span>
                                                <span>{config.day}</span>
                                            </div>
                                            <div>
                                                <span>{t('event_single_page_modal.1')}</span>
                                                <span>{config.start_time.slice(0, 5)}</span>
                                            </div>
                                        </div>



                                        <div className='single_event_modal_item_left_price_and_count'>
                                            <div className='single_event_modal_item_left_price_and_count_standart'>
                                                <div className='single_event_modal_item_left_price'>
                                                    <span>{currentItem?.all_prices[0]?.sub_type === 'standart' ? t('event_single_page_modal.2') : t('event_single_page_modal.4')}</span>
                                                    <span className='single_event_modal_item_left_price_number'>{currentItem?.all_prices[0]?.price} AMD</span>

                                                </div>



                                                <TicketCountDiv
                                                    max={config.tickets.max > 10 ? 10 : config.tickets.max}
                                                    min={config.tickets.min}
                                                    price={currentItem?.all_prices[0]?.price}
                                                    setFullValueTicket={setFullValueTicket}
                                                    setQuantityEvent={setQuantityEvent}
                                                    quantityEvent={quantityEvent}
                                                    totalTicketCount={totalTicketCount}
                                                    setTotalTicketCount={setTotalTicketCount}
                                                    item={config}
                                                    // f={f}
                                                    type={currentItem?.all_prices[0]?.sub_type}
                                                    updateTotalValue={updateTotalValue}
                                                />
                                            </div>


                                        </div>

                                        <span>{t('infoBuyTicket.8')}</span>

                                        <div className='single_event_modal_item_left_count'>
                                            <span>{t('event_single_page_modal.3')}</span>
                                            <span className='single_event_modal_item_left_count_number'>{config.tickets.max}</span>
                                        </div>

                                    </div>

                                </div>

                                // ========================changes================
                            ) : (

                                // =================changes2=====================
                                // <div key={currentItem.id} className='single_event_modal_item_2'>
                                //     <div className='single_event_modal_item_left_date_and_time'>
                                //         <div>
                                //             <span>{t('event_single_page_modal.0')}</span>
                                //             <span>{currentItem?.start_date} - {currentItem?.end_date}</span>
                                //         </div>

                                //     </div>
                                //     <div className='single_event_modal_item_left_block_items'>
                                //         {
                                //             currentItem.all_prices.map((el, idx) => (
                                //                 <div className="single_event_modal_item_left_block">
                                //                     <div className='single_event_modal_item_left'>
                                //                         <div className='single_event_modal_item_left_price_and_count'>
                                //                             <div className='single_event_modal_item_left_price'>
                                //                                 <span>{el.sub_type === 'standart' ? t('event_single_page_modal.2') : t('event_single_page_modal.4')}</span>
                                //                                 <span className='single_event_modal_item_left_price_number'>{el?.price} AMD</span>
                                //                             </div>

                                //                         </div>
                                //                     </div>
                                //                     <div style={{ width: '50px' }}></div>
                                //                     <div className='single_event_modal_item_right'>
                                //                         <TicketCountDiv
                                //                             max={10}
                                //                             min={0}
                                //                             price={el.price}
                                //                             setFullValueTicket={setFullValueTicket}
                                //                             setQuantityEvent={setQuantityEvent}
                                //                             quantityEvent={quantityEvent}
                                //                             item={currentItem}
                                //                             type={el.sub_type}
                                //                             updateTotalValue={updateTotalValue}
                                //                         />
                                //                     </div>
                                //                 </div>
                                //             ))
                                //         }
                                //     </div>
                                // </div>

                                <div key={currentItem.id} className='single_event_modal_item_2'>
                                    <div className='single_event_modal_item_left_date_and_time'>
                                        <div>
                                            <span>{t('event_single_page_modal.0')}</span>
                                            <span>{currentItem?.start_date} - {currentItem?.end_date}</span>
                                        </div>

                                    </div>
                                    <div className='single_event_modal_item_left_block_items'>
                                        <div className="single_event_modal_item_left_block">
                                            <div className='single_event_modal_item_left'>
                                                <div className='single_event_modal_item_left_price_and_count'>
                                                    <div className='single_event_modal_item_left_price'>
                                                        <span>{t('event_single_page_modal.2')}</span>
                                                        <span className='single_event_modal_item_left_price_number'>{currentItem?.all_prices[0]?.price} AMD</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ width: '50px' }}></div>
                                            <div className='single_event_modal_item_right'>
                                                <TicketCountDiv
                                                    max={10}
                                                    min={0}
                                                    price={currentItem?.all_prices[0]?.price}
                                                    setFullValueTicket={setFullValueTicket}
                                                    setQuantityEvent={setQuantityEvent}
                                                    quantityEvent={quantityEvent}
                                                    item={currentItem}
                                                    type={currentItem?.all_prices[0]?.sub_type}
                                                    updateTotalValue={updateTotalValue}
                                                />
                                            </div>
                                        </div>
                                        <span>{t('infoBuyTicket.8')}</span>

                                    </div>
                                </div>

                                // ======================changes2================
                            )
                        }
                    </div>


                    <div className='single_event_modal_item_total_and_bay'>
                        <div className='single_event_modal_item_total'>
                            <span>{t('Ticket_type_placeholder.7')} {fullValueTicket} AMD</span>
                        </div>
                        <div className='single_event_modal_item_buy'>
                            <button disabled={!fullValueTicket} className='single_event_modal_bay_ticket_btn' onClick={buyTicket}>{t('buttons.0')}</button>
                            <button disabled={!isAuth || !fullValueTicket} className='single_event_modal_add_cart_btn' onClick={addCart}>{t('buttons.3')}</button>
                        </div>
                    </div>

                </div>
            </div>
            <TicketMuseumBlock />
        </>
    );
}

export default SingleEventModal;
