import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleEvent } from '../../store/slices/SingleEventSlice/SingleEventApi'
import { useNavigate, useParams } from 'react-router-dom'
import { selectSingleEvent, selectSingleEventIsActiveModal, selectSingleEventLoading, setIsActiveModal } from '../../store/slices/SingleEventSlice/SingleEventSlice'
import { useTranslation } from 'react-i18next'
import './EventSinglePage.css'
import { dateICon, InvateIcons, inviteIcon, locationIcon, priceIcon, telIcon } from '../../iconFolder/icon'
import Carousel from 'react-multi-carousel';
import { responsiveEventsSlide } from '../../data/data'
import LoadSpinner from '../LoadSpinner/LoadSpinner'
import SingleEventModal from '../SingleEventModal/SingleEventModal'
import OutSideErrorModal from '../OutSideErrorModal/OutSideErrorModal'



function EventSinglePage() {
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
    const { id } = useParams()
    const [openConfigModal, setOpenConfigModal] = useState(false)
    const respSingleEvent = useSelector(selectSingleEvent)
    const [cartErrorMessage, setCartErrorMessage] = useState(false);
   const [copySuccess, setCopySuccess] = useState(false);
    const loading = useSelector(selectSingleEventLoading)
    const isActiveModal = useSelector(selectSingleEventIsActiveModal)
    const privateTicketRegions = t('privateTicketRegions', { returnObjects: true })


    const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';
    const navigate = useNavigate()

    useEffect(() => {
        if (respSingleEvent && respSingleEvent.data && respSingleEvent.data.event_configs) {
            if (respSingleEvent.data.event_configs.length > 0 && openConfigModal) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }
    }, [openConfigModal, respSingleEvent]);

    useEffect(() => {
        dispatch(getSingleEvent(id))
        window.scrollTo({
            top: 0,
            left: 100,
        });
    }, [id])


const copyToClipboard = React.useCallback(() => {
      if (navigator?.clipboard?.writeText) {
         navigator.clipboard.writeText(window.location.href);
         console.log(' test Clipboard live variant 1');
      } else {
         console.log('test Clipboard live variant 2');
         const el = document.createElement('textarea');
         el.value = window.location.href;
         document.body.appendChild(el);
         el.select();
         document.execCommand('copy');
         document.body.removeChild(el);
      }

      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
   }, []);

    const events = respSingleEvent.data.same_museum_event && Array.isArray(respSingleEvent.data.same_museum_event) ?
        respSingleEvent.data.same_museum_event.map(museum => (
            <div key={museum.id} className='more_event'>
                <div className='more_event_img_div'>
                    <img src={museum.image} alt="" />
                    <div className='event__reade_more_div'>
                        <button onClick={() => navigate(`/${leng}/events/${museum.id}`)}>{t('event_single_page.0')}</button>
                    </div>
                </div>
                <div className='more_event_botom'>
                    <span title={museum.name}>{museum.name}</span>
                    <div>
                        <span className='more_event_botom_date'>{museum.start_date} - {museum.end_date}</span>
                        <span className='more_event_botom_price'>{museum.price} AMD</span>
                    </div>
                </div>
            </div>
        ))
        : [];

    return (
        <div className='event_single_page'>
            {cartErrorMessage && <OutSideErrorModal txt={t('Ticket_type_placeholder.8')} />}
            {
                loading === 'pending' ? <LoadSpinner /> : (
                    <div className='container'>
                        <div className='event_single_page_block'>
                            <div className='lines_div_events'>
                                <img src={require('../../images/line_gold.png')} alt="" />
                                <h1>{respSingleEvent?.data?.name}</h1>
                                <img src={require('../../images/line_gold.png')} alt="" />
                            </div>

                            <div className='event_single_page_item'>
                                <div className='event_single_page_item_img_div'>
                                    <img src={respSingleEvent?.data.image} alt="" />
                                </div>

                                <div className='event_single_page_item_img_div_info_div'>
                                    <div className='event_single_page_item_img_div_info_div_description'>
                                        <button onClick={() => dispatch(setIsActiveModal(true))}>{t('event_single_page.1')}</button>
                                        <h3>{t('event_single_page.2')}</h3>
                                        <p>{respSingleEvent?.data.description}</p>
                                    </div>

                                    <div className='event_single_page_item_img_div_info_div_info'>
                                        <div className='event_single_page_item_img_div_info_div_info_location'>
                                            <p className='single_event_museum_name'>{respSingleEvent?.data.museum_name}</p>
                                            {/* <p className='single_event_location'>LOACATION</p> */}
                                            <div className='single_event_location_and_phone_div'>
                                                <div>
                                                    <span>{locationIcon}</span>
                                                    {
                                                        privateTicketRegions.map((item, index) => Object.keys(item)[0] === respSingleEvent?.data.region ? <span key={index}> {Object.values(item)[0]}</span> : '')
                                                    }
                                                </div>
                                                <div>
                                                    <span>{telIcon}</span>
                                                    <div>
                                                        {
                                                            respSingleEvent?.data?.museum_phones && respSingleEvent.data.museum_phones.map((phone, index) => {
                                                                return index === respSingleEvent.data.museum_phones.length - 1
                                                                    ? <span key={index}>{phone}</span>
                                                                    : <span key={index}>{phone + ',    '}</span>;
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='event_single_page_item_img_div_info_div_info_date_and_price'>
                                            <div className='event_single_page_item_img_div_info_div_info_date_div'>
                                                <span>{dateICon}</span>
                                                <span className='event_single_page_item_img_div_info_div_info_date'>{respSingleEvent?.data?.start_date} - {respSingleEvent?.data?.end_date}</span>
                                            </div>

                                            <div className='event_single_page_item_img_div_info_div_info_price_div'>

                                                <div className='event_single_page_item_img_div_info_div_info_price'>
                                                    <span>{priceIcon}</span>
                                                    <span>{respSingleEvent?.data?.price} AMD</span>
                                                </div>

                                                {/* <div className='event_single_page_item_img_div_info_div_info_invite'>
                                                    <span className='event_single_page_item_img_div_info_div_info_invite_icon'>{inviteIcon}</span>
                                                    <span className='event_single_page_item_img_div_info_div_info_invite_txt'>{t('event_single_page.3')}</span>
                                                </div> */}

                                                <div
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={copyToClipboard}
                                                    className=" event_single_page_item_img_div_info_div_info_invite">
                                                    <InvateIcons width={22} />
                                                    <p>{t(`webSideMusum.1`)}</p>
                                                    <div
                                                        className="Invate_child"
                                                        style={{
                                                            opacity: copySuccess ? '1' : '0',
                                                            transform: copySuccess ? 'translateX(35px)' : 'translateX(370px)',
                                                        }}>
                                                        <p>{t(`webSideMusum.3`)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>

                            <div className='more_events'>
                                {events.length > 0 && <h3>{t('more_events')}</h3>}
                                <div className="events_items">
                                    <Carousel
                                        showDots={true}
                                        responsive={responsiveEventsSlide}
                                        infinite={true}
                                        autoPlay={true}
                                        autoPlaySpeed={4000}
                                        keyBoardControl={true}
                                        containerClass="carousel-container"
                                        dotListClass="custom-dot-list-style"
                                        itemClass="carousel-item-padding-40-px">
                                        {events}
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                        {isActiveModal && <SingleEventModal {...{cartErrorMessage, setCartErrorMessage }}  currentItem={respSingleEvent?.data}/>}
                    </div>
                )
            }
        </div>
    )
}

export default EventSinglePage