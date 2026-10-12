import React, { useEffect } from 'react'
import './EventsInHome.css'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { getEventsHome } from '../../store/slices/EventsPageSlice/EventsPageApi'
import { selectHome_list } from '../../store/slices/EventsPageSlice/EventsPageSlice'
import EventsInHomeItem from '../EventsInHomeItem/EventsInHomeItem'
import ButtonSecond from '../ButtonSecond/ButtonSecond';


function EventsInHome() {
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()
    const respHome_list = useSelector(selectHome_list)


    useEffect(() => {
        dispatch(getEventsHome())
    },[])

  return (
    <div className='events_in_home'>
        <div className='container'>
            <div className='events_in_home_block'>
                <div className='lines_div_events'>
                     <img src={require('../../images/line_gold.png')} alt="" />
                     <h2>{t('navMenuItems.2')}</h2>
                     <img src={require('../../images/line_gold.png')} alt="" />
                </div>

                <div className='events_in_home_block_items'>
                    {
                    respHome_list?.data  && respHome_list?.data.map((el, index) => 

                            <EventsInHomeItem key={el.id} el={el} index={index}/>
                        )
                    }
                </div>

                <ButtonSecond txt="1" path="events"/>
            </div>
        </div>
    </div>
  )
}

export default EventsInHome