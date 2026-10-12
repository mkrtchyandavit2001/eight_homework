import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEventsPage } from '../../store/slices/EventsPageSlice/EventsPageApi';
import { selectEventPage, selectEventPageLoading } from '../../store/slices/EventsPageSlice/EventsPageSlice';
import LoadSpinner from '../LoadSpinner/LoadSpinner';
import './EventsPage.css';
import { useTranslation } from 'react-i18next';
import { dropDownIcon, eventTopArrow, filterIcon, filterIcon1, filterIcon2, leftPaginationIcon, locationIcon, locationIcon2, museumIcon, rightPaginationIcon, topArrow } from '../../iconFolder/icon';
import { useNavigate } from 'react-router-dom';
import SingleEventModal from '../SingleEventModal/SingleEventModal';
import { selectSingleEventIsActiveModal, setIsActiveModal } from '../../store/slices/SingleEventSlice/SingleEventSlice';

function EventsPage() {
    const { t, i18n } = useTranslation();
    const [page, setPage] = useState({ i: 1 });
    const [expandedDescription, setExpandedDescription] = useState({});
    const [selectedRegion, setSelectedRegion] = useState({ name: '', id: null, value: '' });
    const [selectedMuseum, setSelectedMuseum] = useState({ name: '', id: null, value: '' });
    const [openModal, setOpenModal] = useState(false);
    const [openMuseumModal, setOpenMuseumModal] = useState(false);
    const [openConfigModal, setOpenConfigModal] = useState(false)
    const [cartErrorMessage, setCartErrorMessage] = useState(false);
    const [currentItem, setCurrentItem] = useState({});
    const respEventPage = useSelector(selectEventPage);
    const loading = useSelector(selectEventPageLoading);
    const isActiveModal = useSelector(selectSingleEventIsActiveModal)

    const dispatch = useDispatch();
    const privateTicketRegions = t('privateTicketRegions', { returnObjects: true });
    const regionRef = useRef(null);
    const museumRef = useRef(null);

    const leng = localStorage.getItem('lang') || 'am';
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getEventsPage({ region: null, museum: null, pageIndex: page.i }));
    }, [dispatch, page]);

    const pagination = () => {
        if (respEventPage.data.params && typeof respEventPage.data.params.page_count !== 'undefined') {
            const paginationList = [];
            for (let i = 1; i <= respEventPage.data.params.page_count; i++) {
                paginationList.push(
                    <li key={i} onClick={() => setPage({ i })} style={{ color: i === page.i ? 'var(--second_font_color)' : 'black' }}>
                        {i}
                    </li>
                );
            }
            return paginationList;
        } else {
            return <LoadSpinner />;
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            setSelectedRegion({ name: '', id: '', value: '' });
        }
    };

    const handleDelMuseum = (event) => {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            setSelectedMuseum({ name: '', id: '', value: '' });
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (regionRef.current && !regionRef.current.contains(e.target)) {
                setOpenModal(false);
            }
            if (museumRef.current && !museumRef.current.contains(e.target)) {
                setOpenMuseumModal(false);
            }
        };

        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

    const filteredMuseums = selectedRegion.name === 'bolor' || selectedRegion.id === null
        ? respEventPage?.data?.params?.museum_list
        : respEventPage?.data?.params?.museum_list.filter(museum => museum.region_name === selectedRegion.name);

    const handleMuseumItem = (museum) => {
        setSelectedMuseum({ name: museum.name, id: museum.id, value: museum.name });
        dispatch(getEventsPage({ region: selectedRegion.id, museum: museum.id, pageIndex: '1' }));
    };

    const handleRegionItem = (region) => {
        setSelectedRegion(region);
        dispatch(getEventsPage({ region: region.id !== 0 ? region.id : null, museum: selectedMuseum.id, pageIndex: '1' }));
        setSelectedMuseum({ name: '', id: null, value: '' });
    };

    const toggleDescription = (id) => {
        setExpandedDescription(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const handleClickBayTicket = (item) => {
        dispatch(setIsActiveModal(true))
        setCurrentItem(item)
    };  
    return (
        <div className='events_page'>
            {loading === 'pending' ? (
                <LoadSpinner fullBackColor="white" />
            ) : (
                <div className='container'>
                    <div className='lines_div_event'>
                        <div>
                            <img src={require('../../images/Line 106.png')} alt="" />
                            <h2>{t('navMenuItems.2')}</h2>
                            <img src={require('../../images/Line 106.png')} alt="" />
                        </div>
                        <h3>{t('eventPageTitle')}</h3>
                    </div>

                    <div className='events_page_block'>
                        <div className='events_page_filter_div'>
                            <div>
                                <div className='events_page_filter_region' ref={regionRef}>
                                    <div className='events_page_filter_region_inp_div'>
                                        <input
                                            type="text"
                                            onKeyDown={handleKeyDown}
                                            onClick={() => setOpenModal(!openModal)}
                                            value={selectedRegion.value}
                                            onChange={() => {}}
                                            placeholder={t('Ticket_type_placeholder.1')}
                                        />
                                        <span>{dropDownIcon}</span>
                                    </div>

                                    {openModal && (
                                        <ul className='events_page_filter_region_list' onClick={() => setOpenModal(false)}>
                                            {privateTicketRegions.map((region, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => handleRegionItem({ name: Object.keys(region)[0], id: index, value: Object.values(region)[0] })}
                                                >
                                                    <span>{locationIcon}</span> <p>{Object.values(region)[0]}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <div className='events_page_filter_museum' ref={museumRef}>
                                    <div className='events_page_filter_museum_inp_div'>
                                        <input
                                            type="text"
                                            value={selectedMuseum.value || ''}
                                            onKeyDown={handleDelMuseum}
                                            onClick={() => setOpenMuseumModal(!openMuseumModal)}
                                            onChange={() => {}}
                                            placeholder={t('Ticket_type_placeholder.3')}
                                        />
                                        <span>{dropDownIcon}</span>
                                    </div>

                                    {openMuseumModal && (
                                        <ul className='events_page_filter_museum_list' onClick={() => setOpenMuseumModal(false)}>
                                            <li onClick={() => handleMuseumItem({ name: t('allMussseum'), id: null })}>
                                                <span>{museumIcon}</span> <p>{t('allMussseum')}</p>
                                            </li>
                                            {filteredMuseums.map((museum) => (
                                                <li key={museum.id} onClick={() => handleMuseumItem(museum)}>
                                                    <span>{museumIcon}</span> <p>{museum.name}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className='event_page_items'>
                            {respEventPage?.data?.data.map((item) => (
                                <div key={item.id} className='event_page_item'>
                                    <div className='event_page_item_img_div'>
                                        <img src={item.image} alt="" />
                                        <div className='event_page_item_navigate_div'>
                                            <button className='event_page_item_navigate_div_btn' onClick={() => navigate(`/${leng}/events/${item.id}`)}>
                                                {t('event_single_page.0')}
                                            </button>
                                        </div>
                                    </div>

                                    <div className='event_page_item_info_div'>
                                        <div className='event_page_item_info_div_description_div'>
                                        <h4 className='event_page_item_info_div_title' title={item.name}>{item.name}</h4>
                                        <span>{item.style === 'basic' ? t('eventTypes.0') : t('eventTypes.1')}</span>
                                            <p className='event_page_item_info_div_description'>
                                                {expandedDescription[item.id] || item.description.length <= 330 ? item.description : `${item.description.slice(0, 330)}...`}
                                            </p>

                                            {item.description.length > 330 && (
                                                <span style={{ cursor: 'pointer', color: 'var(--second_font_color)' }} onClick={() => toggleDescription(item.id)}>
                                                    {!expandedDescription[item.id] ? t('musseumPage_title.2') : eventTopArrow}
                                                </span>
                                            )}
                                            <p>{item.museum_name}</p>
                                            {privateTicketRegions.map((el, index) =>
                                                Object.keys(el)[0] === item.region ? (
                                                    <span key={index}>
                                                        {locationIcon2} {Object.values(el)[0]}
                                                    </span>
                                                ) : (
                                                    ''
                                                )
                                            )}

                                            <div className='data_and_price_div_events'>
                                                <span>{item.full_date}</span>
                                                <span>{item.price} AMD</span>
                                            </div>
                                        </div>

                                        <button className='event_page_item_info_div_btn' onClick={() => handleClickBayTicket(item)}>{t('infoBuyTicket.5')}</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {respEventPage.data.params.page_count > 1 && (
                            <ul className='pagination_ul'>
                                <li onClick={() => page.i > 1 && setPage({ i: page.i - 1 })}>{leftPaginationIcon}</li>
                                {pagination()}
                                <li onClick={() => respEventPage.data.params.page_count > page.i && setPage({ i: page.i + 1 })}>{rightPaginationIcon}</li>
                            </ul>
                        )}
                    </div>
                </div>
            )}

        {isActiveModal && <SingleEventModal {...{cartErrorMessage, setCartErrorMessage, currentItem}} />}
        </div>
    );
}

export default EventsPage;
