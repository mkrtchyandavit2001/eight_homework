import React, { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import ButtonSecond from '../ButtonSecond/ButtonSecond'
import { useDispatch, useSelector } from 'react-redux'
import { selectprivateTicket } from '../../store/slices/PrivateTicketSlice/PrivateTicketSlice'
import DualCalendar from '../DualCalendar/DualCalendar'
import './PrivateEventTicket.css'
import { getEvents } from '../../store/slices/PrivateEventTicketSlice/PrivateEventTicketApi'
import { postTicketCart } from '../../store/slices/Shop/ShopApi'
import { getPrivateTicket } from '../../store/slices/PrivateTicketSlice/PrivateTicketApi'
import { getEventsTicket } from '../../store/slices/PrivateEventTicketSlice/PrivateEventTicketSlice'
import TicketCountDiv from '../TicketCountDiv/TicketCountDiv'
import { getIsAuth } from '../../store/slices/Auth/AuthSlice'
import { setModalIsOpenShop } from '../../store/slices/Shop/ShopSlice'
import { eventIcon, locationIcon, museumIcon, privateTicketIcon } from '../../iconFolder/icon'
import { setModalTicketIsOpen, setTicketType } from '../../store/slices/MuseumTicket/MuseumTicketSlice'
import { TicketMuseumBlock } from '../MuseumPage/MuseumOne/Ticket'
import { postBuyTicket } from '../../store/slices/BuyTicketSlice/BuyTicketApi'
import { selectBuyTicket, setObj } from '../../store/slices/BuyTicketSlice/BuyTicketSlice'
import OutSideErrorModal from '../OutSideErrorModal/OutSideErrorModal'

function PrivateEventTicket({changeTicketType}) {
    const {t, i18n} = useTranslation()
    const [selectedRegion, setSelectedRegion] = useState({ name: '', id: '0', value: '' })
    const [selectedMuseum, setSelectedMuseum] = useState('')
    const [openModal, setopenModal] = useState(false)
    const [openModalEvent, setopenModalEvent] = useState(false)
    const [openModalMuseum, setopenModalMuseum] = useState(false)
    const [ticketTypesBlock, setTicketTypesBlock] = useState(false)
    const [museumItem, setMuseumItem] = useState(null)
    const [fullValueTicket, setFullValueTicket] = useState(0)
    const [eventInpVal, setEventInpVal] = useState('')
    const [currentEvent, setCurrentEvent] = useState(null)
    const [quantityEvent, setQuantityEvent] = useState([])
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [cartErrorMessage, setCartErrorMessage] = useState(false)
    const [eventLineRegion, setEventLineRegion] = useState(true)
    const [eventLineMuseum, setEventLineMuseum] = useState(true)
    const [eventLineCalendar, setEventLineCalendar] = useState(true)
    const [eventLineEvent, setEventLineEvent] = useState(true)
    const [errorMessageTicket, setErrorMessageTicket] = useState(false)
    const [totalTicketCount, setTotalTicketCount] = useState([]);
    const regionRef = useRef(null)
    const museumRef = useRef(null)
    const privateRef = useRef(null)
    const eventeRef = useRef(null)
    const dispatch = useDispatch()
    const respStandartTicket = useSelector(selectprivateTicket)
    const respEvent = useSelector(getEventsTicket)
    const isAuth = useSelector(getIsAuth)
    const respBuyTicket = useSelector(selectBuyTicket)
    const totalValuesRef = useRef({});




    useEffect(() => {
        setSelectedMuseum('')
    }, [changeTicketType])

    useEffect(() => {
        setSelectedMuseum('')
        setEventInpVal('')
    }, [respStandartTicket.data])

    const handleKeyDown = (event) => {
        const key = event.key;
        if (key === 'Backspace' || key === 'Delete') {
            setSelectedRegion({name: '', id: '', value: ''})
        }
    };

    const handleDelMuseum = (event) => {
        const key = event.key;
        if (key === 'Backspace' || key === 'Delete') {
            setSelectedMuseum('')
            setMuseumItem(null)
        }
    };

    const handleDelEvent = (event) => {
        const key = event.key;
        if (key === 'Backspace' || key === 'Delete') {
            setEventInpVal('')
        }
    };


    useEffect(() => {

        const hendelClick = (e) => {
            let path = e.composedPath ? e.composedPath() : e.path
            let path2 = e.composedPath ? e.composedPath() : e.path
            let path3 = e.composedPath ? e.composedPath() : e.path
            let path4 = e.composedPath ? e.composedPath() : e.path
            

            if (!path.includes(regionRef.current)) {
                setopenModal(false)
                setEventLineRegion(true)
                setEventLineCalendar(true)

            }
            if (!path2.includes(museumRef.current)) {
                setopenModalMuseum(false)
                setEventLineMuseum(true)
                setEventLineRegion(true)
            }
            if (!path3.includes(privateRef.current)) {
                setTicketTypesBlock(false)
                setErrorMessageTicket(false)
            }
            if (!path4.includes(eventeRef.current)) {
                setopenModalEvent(false)
                setEventLineEvent(true)
            }
        }

        window.addEventListener('click', hendelClick)
        return () => window.removeEventListener('click', hendelClick)

    }, [])


    
    const filteredMuseums = selectedRegion.name === 'bolor' || selectedRegion.id === '0'
        ? respStandartTicket.data
        : respStandartTicket.data.filter(museum => museum.region_name === selectedRegion.name);

        const privateTicketRegions = t('privateTicketRegions', {returnObjects: true})

    

        const handleMuseumItemClick = (museum) => {
            setSelectedMuseum(museum.name)
            setMuseumItem(museum)
            setFullValueTicket(0)
            setEventInpVal('')
            dispatch(getEvents({museumId: museum.id, start_date: startDate, end_date: endDate}))
        }

        

       const handleEventItemClick = (e, el) =>{
            setEventInpVal(el.name)
            setopenModalEvent(false)
            setCurrentEvent(el)
       }

       const handleRegionItem = (e, el) =>{
        setSelectedRegion(el)
        setSelectedMuseum('')
        setEventInpVal('')
   }

       const addCart = async(e) => {
        e.stopPropagation()
        if (isAuth) {
            if (currentEvent?.style === "basic") {
                await dispatch(postTicketCart({
                    items: currentEvent?.event_configs.map(el => {
                        return currentEvent?.all_prices.map(priceObj => ({
                            type: 'event-config',
                            id: el.id,
                            sub_type: priceObj.sub_type,
                            // price: priceObj.price,
                            quantity: sessionStorage.getItem(`quantity${el.id + priceObj.sub_type}`)
                        }));
                    }).flat().filter(el => el.quantity > 0)
                }));
            } 
            else  {
                await dispatch(postTicketCart({
                    items: currentEvent?.all_prices.map(priceObj => ({
                        type: 'event',
                        id: currentEvent.id,
                        sub_type: priceObj.sub_type,
                        // price: priceObj.price,
                        quantity: sessionStorage.getItem(`quantity${currentEvent.id + priceObj.sub_type}`)
                    })).flat().filter(el => el.quantity > 0)
                }));
            }
            dispatch(setModalIsOpenShop(true));
        }
         else{
            setCartErrorMessage(true);
            setTimeout(() => {
                setCartErrorMessage(false);
            }, 4000); 
         }

         setTicketTypesBlock(false)
        
        } 
        

        const buyTicket = async(e) => {
            e.preventDefault()

            if(isAuth){
                if (currentEvent?.style === "basic") {
                await dispatch(postBuyTicket({
                    items: currentEvent?.event_configs.map(el => {
                        return currentEvent?.all_prices.map(priceObj => ({
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
                    await dispatch(postBuyTicket({
                        items: currentEvent?.all_prices.map(priceObj => ({
                            type: 'event',
                            id: currentEvent.id,
                            sub_type: priceObj.sub_type,
                            // price: priceObj.price,
                            quantity: sessionStorage.getItem(`quantity${currentEvent.id + priceObj.sub_type}`)
                        })).flat().filter(el => el.quantity > 0)
                    }))
                        .then(res => {
                            if (res.meta.requestStatus === "fulfilled") {
                                window.location.href = res.payload.data.redirect_url;
                            }
                        });
                }
    
                // currentEvent.event_configs.map(item => {
                //     sessionStorage.removeItem(`quantity${item.id}`)
                // })
            }
            else{
                
                if (currentEvent.style === 'basic') {
                    await dispatch(setObj({
                        items: currentEvent?.event_configs.map(el => {
                            return currentEvent?.all_prices.map(priceObj => ({
                                type: 'event-config',
                                id: el.id,
                                sub_type: priceObj.sub_type,
                                // price: priceObj.price,
                                quantity: sessionStorage.getItem(`quantity${el.id + priceObj.sub_type}`)
                            }));
                        }).flat().filter(el => {
                            if(el.quantity > 0){
                                dispatch(setTicketType({kindOf: 'form', type: 'Buy Ticket', ticketType: 'standart'}))
                                dispatch(setModalTicketIsOpen(true))
                                setErrorMessageTicket(false)
                                
                                return el
                            }
                            else{
                                setErrorMessageTicket(true)
                            }
                        })
           
                    }))
                }
                else {
                    await dispatch(setObj({
                        items: currentEvent?.all_prices.map(priceObj => ({
                            type: 'event',
                            id: currentEvent.id,
                            sub_type: priceObj.sub_type,
                            // price: priceObj.price,
                            quantity: sessionStorage.getItem(`quantity${currentEvent.id + priceObj.sub_type}`)
                        })).flat().filter(el => {
                            if(el.quantity > 0){
                                dispatch(setTicketType({kindOf: 'form', type: 'Buy Ticket', ticketType: 'standart'}))
                                dispatch(setModalTicketIsOpen(true))
                                setErrorMessageTicket(false)
                                
                                return el
                            }
                            else{
                                setErrorMessageTicket(true)
                            }
                        })
                    }))

                    console.log('tandz');
                    
                }


            }
        }

        const handleMuseumInpFocus = (e) => {
            e.stopPropagation()
            setEventLineMuseum(false)
            setEventLineRegion(false)
            setopenModal(false)
            setTicketTypesBlock(false)
            setopenModalEvent(false)
        }
    
        const handleRegionInpFocus = (e) => {
            e.stopPropagation()
            setEventLineRegion(false)
            setTicketTypesBlock(false)
            setopenModalMuseum(false)
            setEventLineCalendar(false)
            setopenModalEvent(false)
        }


        const handleEventInpFocus = (e) => {
            e.stopPropagation()
            setTicketTypesBlock(false)
            setopenModalMuseum(false)
            setEventLineMuseum(false)
            setEventLineEvent(false)
        }
    
        const handlePrivateBlockClick = (e) => {
            e.stopPropagation()
            setEventLineEvent(false)
            setTicketTypesBlock(true)
            setopenModal(false)
            setopenModalMuseum(false)
            setopenModalEvent(false)

        }

        const updateTotalValue = (key, value) => {
            totalValuesRef.current[key] = value;
            const total = Object.values(totalValuesRef.current).reduce((acc, curr) => acc + curr, 0);
            setFullValueTicket(total);
        };

   const ticketsType_for_private = t('ticketsType_for_private', { returnObjects: true })


    return (
        <>
            <div className='private_standart_ticket'>
            {cartErrorMessage && <OutSideErrorModal txt={t('Ticket_type_placeholder.8')}/>}
            <DualCalendar {...{selectedMuseum, setStartDate, setEndDate, startDate, endDate, museumItem, setEventLineCalendar}}/>

            <div className='private_standart_ticket_regions' ref={regionRef} onClick={(e) => handleRegionInpFocus(e)}>
                <input type="text" onKeyDown={handleKeyDown} onClick={() => setopenModal(!openModal)} value={selectedRegion.value } onChange={() => { }} placeholder={t('Ticket_type_placeholder.0')} />

                <div className='placeholder_div'>
                        <span>{locationIcon}</span>
                        <p>{t('Ticket_type_placeholder.1')}</p>
                </div>
                
                {eventLineRegion && <div className='line_ticket'></div>}
                {eventLineCalendar && <div className='line_ticket_left'></div>}
                {
                    openModal && (
                        <ul className='private_standart_ticket_regions_list' onClick={() => setopenModal(false)}>
                            {
                                privateTicketRegions.map((region, index) => {
                                     
                                    return <li key={index} onClick={(e) => handleRegionItem(e, { name: Object.keys(region)[0], id: index+ 1, value: Object.values(region)[0]})}><span>{locationIcon}</span> <p>{Object.values(region)[0]}</p></li>

                            })
                            }
                        </ul>
                    )
                }
            </div>

            <div className='private_standart_ticket_museums  private_event_ticket_museums' ref={museumRef} onClick={handleMuseumInpFocus}>
                <input type="text" onKeyDown={handleDelMuseum} value={selectedMuseum} onClick={() => setopenModalMuseum(true)} onChange={() => { }} placeholder={t('Ticket_type_placeholder.2')}/>

                <div className='placeholder_div'>
                    <span>{museumIcon}</span>
                        <p>{t('Ticket_type_placeholder.3')}</p>
                </div>

                {
                  filteredMuseums.length !== 0 &&   openModalMuseum && (

                        <ul className='private_standart_ticket_museum_list' onClick={() => setopenModalMuseum(false)}>
                            {filteredMuseums.map(museum => museum.is_buy_ticket  && (
                                <li key={museum.id} onClick={() => handleMuseumItemClick(museum)}>
                                    <span>{museumIcon}</span>
                                    <p>{museum.name}</p>
                                </li>
                            ))}
                        </ul>
                    )
                }

                {eventLineMuseum && <div className='line_ticket'></div>}

            </div>

            <div className='private_tickets_events' ref={eventeRef} onClick={handleEventInpFocus}>
                <input type="text" placeholder={t('Ticket_type_placeholder.4')} value={eventInpVal || ''} onKeyDown={handleDelEvent}  onClick={() => setopenModalEvent(!openModalEvent)} onChange={()=> {}}/>

                <div className='placeholder_div'>
                    <span>{eventIcon}</span>
                        <p>{t('Ticket_type_placeholder.5')}</p>
                </div>

               {selectedMuseum && openModalEvent && <ul className='private_tickets_events_list'>
                    {
                        respEvent?.data.map(el =>
                            <li key={el.id} onClick={(e) => handleEventItemClick(e, el)}><span>{eventIcon}</span> <p>{el.name}</p></li>
                        )
                        
                    }
                </ul>}
                {eventLineEvent && <div className='line_ticket'></div>}
            </div>

            <div ref={privateRef} className='private_standart_ticket_museums_private_block' onClick={handlePrivateBlockClick} style={{boxShadow: ticketTypesBlock ?'0 0 20px rgba(0, 0, 0, 0.055)' : 'none'}}>
                <div className='placeholder_div_ticket'>
                        <span>{privateTicketIcon}</span>
                        <p>{t('Ticket_type_placeholder.6')}</p>
                </div>

                {ticketTypesBlock && eventInpVal && 

                 (<div className='private_event_ticket_private_block_ticket_types'>
                    
                    <div className='events_ticket_block'>
                        {
                           currentEvent?.style === 'basic' ? currentEvent?.event_configs.map(item => 
                                <div className='events_ticket_block_event' key={item.id}>
                                    <span>{currentEvent.name}</span>
                                    <div className='events_ticket_block_event_time_div'>
                                        <span>{item.day}</span>
                                        <span>{item.start_time.slice(0,5)}</span>
                                    </div>

                                    <div className='events_ticket_block_event_price'>
                                        {
                                            currentEvent?.all_prices.map(el => (
                                                <div className='events_ticket_block_event_price_div'>
                                                    {
                                                        ticketsType_for_private.map(ticket => {
                                                            if (Object.keys(ticket)[0] === el.sub_type) {
                                                               return <span className='events_ticket_block_event_price_div_span' key={el.id}>{Object.values(ticket)[0]}</span>
                                                            }
                        
                                                         })
                                                    }
                                                    <TicketCountDiv max={10} min={0} price={el.price} setFullValueTicket={setFullValueTicket} setQuantityEvent={setQuantityEvent} quantityEvent={quantityEvent} item= {item} updateTotalValue={updateTotalValue} type={el.sub_type} totalTicketCount={totalTicketCount}
                                                    setTotalTicketCount={setTotalTicketCount}/>
                                                </div>
                                                
                                            ))
                                            
                                        }
                                    </div>
                                        <div className='events_ticket_block_event_limit'>
                                            <span>{t('event_single_page_modal.3')}</span>
                                            <span className='events_ticket_block_event_limit_span'>{item?.visitors_quantity_limitation}</span>
                                        </div>
                                </div>
                            ) : <div className='events_ticket_block_event'>
                                <span>{currentEvent.name}</span>
                                <div className='events_ticket_block_event_time_div'>
                                    <span>{currentEvent.start_date + ' - ' + currentEvent.end_date}</span>
                                    {/* <span>{currentEvent.start_time.slice(0,5)}</span> */}
                                </div>

                                                            
                                {/* <TicketCountDiv max={10} min={0} price={currentEvent.price} setFullValueTicket={setFullValueTicket} setQuantityEvent={setQuantityEvent} quantityEvent={quantityEvent} item= {currentEvent} /> */}

                                <div className='events_ticket_block_event_price'>
                                        {
                                            currentEvent?.all_prices.map(el => (
                                                <div className='events_ticket_block_event_price_div'>
                                                    {
                                                        ticketsType_for_private.map(ticket => {
                                                            if (Object.keys(ticket)[0] === el.sub_type) {
                                                               return <span className='events_ticket_block_event_price_div_span' key={el.id}>{Object.values(ticket)[0]}</span>
                                                            }
                        
                                                         })
                                                    }
                                                   { el.sub_type === 'standart' ?  <TicketCountDiv max={10} min={0} price={el.price} setFullValueTicket={setFullValueTicket} setQuantityEvent={setQuantityEvent} quantityEvent={quantityEvent} item= {currentEvent} updateTotalValue={updateTotalValue} type={el.sub_type} totalTicketCount={totalTicketCount}
                                                    setTotalTicketCount={setTotalTicketCount}/> 
                                                    : <div className='Events_ticket_price'>
                                                        <p>{el.price} AMD</p>
                                                        <span style={{width: '100px'}}>{t('infoBuyTicket.8')}</span>
                                                    </div>
                                                }
                                                </div>
                                                
                                            ))
                                            
                                        }
                                    </div>

                            </div>
                        }
                    </div>
                    <div className='private_standart_ticket_museums_private_block_ticket_types_full_value'>
                        <span>{t('Ticket_type_placeholder.7')}   {fullValueTicket} AMD</span>
                    </div>

                    {respBuyTicket?.data.success === false && <p>{respBuyTicket?.data.message}</p>}
                    {errorMessageTicket && <p className='err_message_tickets'>{t('ticket_error_message')}</p>}


                    <div className='private_standart_ticket_museums_private_block_ticket_types_buy_div'>
                        
                            <button disabled={!fullValueTicket} className='bay_ticket_btn' onClick={buyTicket}>{t('buttons.0')}</button>
                            <button disabled={!isAuth || !fullValueTicket} className='add_cart_btn' onClick={addCart}>{t('buttons.3')}</button>
                    </div>
                 </div>
                )}
            </div>
        </div>
         <TicketMuseumBlock/>
        </>
    )
}

export default PrivateEventTicket