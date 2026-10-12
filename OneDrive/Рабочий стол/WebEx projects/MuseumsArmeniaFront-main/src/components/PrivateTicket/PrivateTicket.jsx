import React, { useEffect, useState } from 'react'
import { ticketsType } from '../../data/data'
import './PrivateTicket.css'
import { useDispatch } from 'react-redux'
import { getPrivateTicket } from '../../store/slices/PrivateTicketSlice/PrivateTicketApi'
import PrivateStandartAndAbonementTicket from '../PrivateStandartAndAbonementTicket/PrivateStandartAndAbonementTicket'
import PrivateUnitedTicket from '../PrivateUnitedTicket/PrivateUnitedTicket'
import PrivateEventTicket from '../PrivateEventTicket/PrivateEventTicket'
import { useTranslation } from 'react-i18next'
import { dotIcon } from '../../iconFolder/icon'

function PrivateTicket() {
    const {t, i18n} = useTranslation()
    const [changeTicketType, setChangeTicketType] = useState('1')
    const dispatch = useDispatch()

     const ticketsType = [
        {
            id: '1',
            type: 'standart',
            type_name: t('ticketsType.0')
        },
    
        {
            id: '2',
            type: 'subscription',
            type_name: t('ticketsType.1')
        },
    
        {
            id: '3',
            type: 'united',
            type_name: t('ticketsType.2')
        },
    
        {
            id: '4',
            type: 'event',
            type_name: t('ticketsType.3')
        }
    ]

    
    const handleChangeTicket = (item_id, type) =>{
        setChangeTicketType(item_id)
        dispatch(getPrivateTicket({type: type, startDate: null, endDate: null, museumId: null }))
    }

    useEffect(()=> {
        dispatch(getPrivateTicket({type: 'standart', startDate: null, endDate: null, museumId: null }))
    },[])


  return (
    <div className='private_ticket'>
        <div className='container'>
            <div className='private_ticket_type_div'>
                {
                    ticketsType.map(item => 
                        <button key={item.id}  style={{color: changeTicketType === item.id ? '#3F3D56' : 'gray'}} onClick={() => handleChangeTicket(item.id, item.type)}><span>{changeTicketType === item.id && dotIcon}</span><p>{item.type_name}</p></button>
                    )
                }
            </div>

                {changeTicketType === '1' || changeTicketType === '2' ? <PrivateStandartAndAbonementTicket changeTicketType={changeTicketType}/> : ''}
                {changeTicketType === '3' && <PrivateUnitedTicket/>}
                {changeTicketType === '4' && <PrivateEventTicket/>}
        </div>

    </div>
  )
}

export default PrivateTicket