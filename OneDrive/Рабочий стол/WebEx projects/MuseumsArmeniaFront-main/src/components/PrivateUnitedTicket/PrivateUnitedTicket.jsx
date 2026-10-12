import React, { useEffect, useState, useRef } from 'react'
import { privateTicketsData } from '../../data/data'
import { useTranslation } from 'react-i18next'
import ButtonSecond from '../ButtonSecond/ButtonSecond'
import { useDispatch, useSelector } from 'react-redux'
import { getPrivateTicket } from '../../store/slices/PrivateTicketSlice/PrivateTicketApi'
import { selectprivateTicket } from '../../store/slices/PrivateTicketSlice/PrivateTicketSlice'
import { postTicketCart } from '../../store/slices/Shop/ShopApi'
import './PrivateUnitedTicket.css'
import { setModalIsOpenShop } from '../../store/slices/Shop/ShopSlice'
import { getIsAuth } from '../../store/slices/Auth/AuthSlice'
import { locationIcon, MinusButtonIcons, minusIcon, museumIcon, PlusButtonIcons, plusIcon, privateTicketIcon } from '../../iconFolder/icon'
import { postBuyTicket } from '../../store/slices/BuyTicketSlice/BuyTicketApi'
import { selectBuyTicket, setObj } from '../../store/slices/BuyTicketSlice/BuyTicketSlice'
import { setModalTicketIsOpen, setTicketType } from '../../store/slices/MuseumTicket/MuseumTicketSlice'
import { TicketMuseumBlock } from '../MuseumPage/MuseumOne/Ticket'
import OutSideErrorModal from '../OutSideErrorModal/OutSideErrorModal'

function PrivateUnitedTicket() {
    const { t, i18n } = useTranslation()
    const [selectedRegion, setSelectedRegion] = useState({ name: '', id: '0', value: '' })
    const [selectedMuseum, setSelectedMuseum] = useState('')
    const [openModal, setopenModal] = useState(false)
    const [openModalMuseum, setopenModalMuseum] = useState(false)
    const [ticketTypesBlock, setTicketTypesBlock] = useState(false)
    const [museumItem, setMuseumItem] = useState(null)
    const [ticketCount, setTicketCount] = useState(1)
    const [fullValueTicket, setFullValueTicket] = useState(0)
    const [options, setOptions] = useState([]);
    const [currentOpt, setCurrentOpt] = useState([]);
    const [cartErrorMessage, setCartErrorMessage] = useState(null)
    const [eventLineRegion, setEventLineRegion] = useState(true)
    const [eventLineMuseum, setEventLineMuseum] = useState(true)
    const regionRef = useRef(null)
    const museumRef = useRef(null)
    const privateRef = useRef(null)
    const museumInpRef = useRef(null)
    const isAuth = useSelector(getIsAuth)
    const respStandartTicket = useSelector(selectprivateTicket)
    const respBuyTicket = useSelector(selectBuyTicket)

    const dispatch = useDispatch()





    const handleKeyDown = (event) => {
        const key = event.key;
        if (key === 'Backspace' || key === 'Delete') {
            setSelectedRegion({ name: '', id: '', value: '' })
        }
    };

    const handleDelMuseum = (event) => {
        const key = event.key;
        if (key === 'Backspace' || key === 'Delete') {
            setSelectedMuseum('')
        }
    };

    useEffect(() => {

        const hendelClick = (e) => {
            let path = e.composedPath ? e.composedPath() : e.path
            let path2 = e.composedPath ? e.composedPath() : e.path
            let path3 = e.composedPath ? e.composedPath() : e.path


            if (!path.includes(regionRef.current)) {
                setopenModal(false)
                setEventLineRegion(true)
            }
            if (!path2.includes(museumRef.current)) {
                setopenModalMuseum(false)
                setEventLineMuseum(true)
                setEventLineRegion(true)
            }
            if (!path3.includes(privateRef.current)) {
                setTicketTypesBlock(false)
                setTicketCount(1)
            }
        }

        window.addEventListener('click', hendelClick)
        return () => window.removeEventListener('click', hendelClick)

    }, [])


    useEffect(() => {
        selectedRegion.name === 'bolor' || selectedRegion.id === '0'
            ? setOptions(respStandartTicket.status === 'succes' && respStandartTicket.data)
            : setOptions(respStandartTicket.status == 'succes' && respStandartTicket.data.filter(museum => museum.region_name === selectedRegion.name))

    }, [respStandartTicket.data])


    const privateTicketRegions = t('privateTicketRegions', { returnObjects: true })



    

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        currentOpt.forEach(museum => {

            totalPrice += museum.tickets[0].price * ticketCount;
        })
        setFullValueTicket(totalPrice);
    };

    useEffect(() => {
        calculateTotalPrice();
    }, [currentOpt, ticketCount]);


    const handleCheckboxChange = (e, museum) => {
        setOptions(prevOptions =>
            prevOptions.map(option =>
                option.id === museum.id ? { ...option, complited: !option.complited } : { ...option }
            )
        );

        const isChecked = e.target.checked;

        if (isChecked) {
            setCurrentOpt([...currentOpt, museum]); // Ավելացնել ընտրված ելեմենտը
        } else {
            setCurrentOpt(currentOpt.filter(item => item.id !== museum.id)); // Հեռացնել ելեմենտը
        }


    };


    const handleSelectRegion = (e, obj) => {
        setSelectedRegion(obj)
        dispatch(getPrivateTicket({type: 'united', startDate: null, endDate: null, museumId: null}))
        setCurrentOpt([])
    }

    const packetCount = (op) => {
        if (op === '+') {
            currentOpt.forEach(el => {
                if (ticketCount < respStandartTicket.params.max_ticket_quantity) {
                    setTicketCount(ticketCount + 1);
                    setFullValueTicket(prevValue => prevValue + el.tickets[0].price);

                }
            });
        } else {
            if (ticketCount > 1) {
                setTicketCount(prevCount => prevCount - 1);
                currentOpt.forEach(el => {
                    setFullValueTicket(prevValue => prevValue - el.tickets[0].price);
                });
            }
        }
    };

    const addCart = (e) => {
        e.stopPropagation()
        if(isAuth){
            dispatch(setModalIsOpenShop(true));
        let museumId = []
        let typeTicket = ''
        currentOpt.map(item => {
            museumId.push(item.id)
            typeTicket = item.tickets[0].type
        })

        dispatch(postTicketCart({
            items: [{
                type: typeTicket,
                museum_ids: museumId,
                quantity: ticketCount
            }]
        }));

        setTicketTypesBlock(false)
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
        let museumId = []
        let typeTicket = ''
        currentOpt.map(item => {
        museumId.push(item.id)
        typeTicket = item.tickets[0].type
    })

        if(isAuth){
            await dispatch(postBuyTicket({
            request_name: "web",
            redirect_url: window.location.href,
            items: [{
                type: typeTicket,
                museum_ids: museumId,
                quantity: ticketCount
            }]
        })).then(res => {
            if(res.meta.requestStatus === "fulfilled"){
                window.location.href = res.payload.data.redirect_url
            }
            
       })
        }
        else{
            dispatch(setTicketType({kindOf: 'form', type: 'Buy Ticket', ticketType: 'standart'}))
            dispatch(setModalTicketIsOpen(true))
            setTicketTypesBlock(false)
            dispatch(setObj({
                request_name: "web",
                items: [{
                    type: typeTicket,
                    museum_ids: museumId,
                    quantity: ticketCount
                }]
            }))
        }
    }

    const  handleMuseumInpFocus = (e)=>{
        e.stopPropagation()
          setEventLineMuseum(false)
          setEventLineRegion(false)
          setopenModal(false)
          setTicketTypesBlock(false)
          setTicketCount(1)
       }

      const handleRegionInpFocus = (e) =>{
        e.stopPropagation()
        setEventLineRegion(false)
        setTicketTypesBlock(false)
        setopenModalMuseum(false)
        setTicketCount(1)
      }

     const handlePrivateBlockClick = (e) =>{
        e.stopPropagation()
        setEventLineMuseum(false)
        setTicketTypesBlock(true)
        setopenModal(false)
        setopenModalMuseum(false)
     }

     const allowedIds = [1, 2, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 26];



    return (
        <>
        <div className='private_standart_ticket'>
            {cartErrorMessage && <OutSideErrorModal txt={t('Ticket_type_placeholder.8')}/>}
            <div className='private_standart_ticket_regions regions_input_div' ref={regionRef} onClick={(e)=> handleRegionInpFocus(e)}>
                <input type="text" onKeyDown={handleKeyDown} onClick={() => setopenModal(!openModal)} value={selectedRegion.value || ''} onChange={() => { }} placeholder={t('Ticket_type_placeholder.0')}/>

                <div className='placeholder_div'>
                    <span>{locationIcon}</span>
                        <p>{t('Ticket_type_placeholder.1')}</p>
                </div>

                {
                    openModal && (
                        <ul className='private_standart_ticket_regions_list' onClick={() => setopenModal(false)}>
                            {
                                privateTicketRegions.map((region, index) => {

                                    return <li key={index} onClick={(e) => handleSelectRegion(e, { name: Object.keys(region)[0], id: index + 1, value: Object.values(region)[0] })}><span>{locationIcon}</span> <p>{Object.values(region)[0]}</p></li>

                                })
                            }
                        </ul>
                    )
                }
                {eventLineRegion && <div className='line_ticket'></div>}
            </div>

            <div className='private_standart_ticket_museums' ref={museumRef} onClick={(e)=> handleMuseumInpFocus(e)}>
                <input type="text" onKeyDown={handleDelMuseum} value={currentOpt.length !== 0 ?`Ընտրված թանգարաններ ${currentOpt.length}` : ''} onClick={() => setopenModalMuseum(true)} onChange={() => { }} placeholder={t('Ticket_type_placeholder.2')} />

                <div className='placeholder_div'>
                    <span>{museumIcon}</span>
                        <p>{t('Ticket_type_placeholder.3')}</p>
                </div>

                {options.length !== 0 && openModalMuseum && (
                    <ul className='private_united_ticket_museum_list'>
                        {options && options.map(museum => museum.is_buy_ticket &&  (
                            <label key={museum.id}>
                                <span>{museumIcon}</span>
                                <li>
                                    <span>{museum.name}</span>
                                    <span>{museum.tickets[0].price} AMD</span>
                                </li>
                                <input
                                    id={museum.id}
                                    ref={museumInpRef}
                                    checked={currentOpt.some(item => item.id === museum.id)}
                                    type="checkbox"
                                    onChange={(e) => handleCheckboxChange(e, museum)}
                                />
                            </label>
                        ))}
                    </ul>
                )}

                {eventLineMuseum && <div className='line_ticket'></div>}

            </div>

            <div ref={privateRef} className='private_standart_ticket_museums_private_block'  onClick={(e) => handlePrivateBlockClick(e)} style={{boxShadow: ticketTypesBlock ? '0 0 20px rgba(0, 0, 0, 0.055)' : 'none'}}>
                <div className='placeholder_div_ticket'>
                        <span>{privateTicketIcon}</span>
                        <p>{t('Ticket_type_placeholder.6')}</p>
                </div>

                {ticketTypesBlock && currentOpt.length >= respStandartTicket.params.min_museum_quantity &&

                    (<div className='private_standart_ticket_museums_private_block_ticket_types'>
                        {
                            currentOpt.length >= respStandartTicket.params.min_museum_quantity && currentOpt.map(el =>
                                <div key={el.id}>
                                    <div className='packet_div'>
                                        <span className='packet_div_type'>{el.name}</span>
                                        <span className='packet_div_price'>{el.tickets[0].price} AMD</span>
                                    </div>
                                </div>
                            )
                        }

                        <div className='packet_div_count'>
                            <span onClick={() => packetCount('-')}><MinusButtonIcons width='25' height='25'/></span>
                            <span style={{color: ticketCount > 0 ? 'black' : 'gray'}}>{ticketCount}</span>
                            <span onClick={() => packetCount('+')}><PlusButtonIcons width='25' height='25'/></span>
                        </div>

                        <div className='private_standart_ticket_museums_private_block_ticket_types_full_value'>
                            <span>{t('Ticket_type_placeholder.7')}   {fullValueTicket} AMD</span>
                        </div>

                        {respBuyTicket?.data.success === false && <p>{respBuyTicket?.data.message}</p>}

                        <div className='private_standart_ticket_museums_private_block_ticket_types_buy_div'>

                            <button className='bay_ticket_btn' onClick={buyTicket}>{t('buttons.0')}</button>
                            <button className='add_cart_btn' onClick={addCart}>{t('buttons.3')}</button>
                        </div>
                    </div>
                    )}
            </div>
        </div>

        <TicketMuseumBlock/>

        </>
    )
}

export default PrivateUnitedTicket