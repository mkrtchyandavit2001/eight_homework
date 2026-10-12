import React, { useEffect } from 'react'
import { responsive } from '../../data/data'
import "react-multi-carousel/lib/styles.css";
import './MuseumSectionSliderInHome.css'

import Carousel from 'react-multi-carousel';
import { useTranslation } from 'react-i18next';
import { locationIcon } from '../../iconFolder/icon';
import { useDispatch, useSelector } from 'react-redux';
import { postMuseumPages } from '../../store/slices/MuseumPagesSlice/MuseumPagesApi';
import { selectMuseum } from '../../store/slices/MuseumPagesSlice/MuseumPagesSlice';
import { useNavigate } from 'react-router-dom';

function MuseumSectionSliderInHome() {

    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const respMuseum = useSelector(selectMuseum)
   const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';
    const privateTicketRegions = t('privateTicketRegions', { returnObjects: true })


    useEffect(() => {
        dispatch(postMuseumPages())
    }, [])

    const product =
        respMuseum && respMuseum.map(item => {

            return <div key={item.id} className='museum_section_item' onClick={() => navigate(`/${leng}/museums/museum/${item.id}`)}>
                <div className='museum_section_item_img_div'>
                    <img src={item.photo} alt="news"  loading='lazy'/>
                </div>

                <div className='museum_section_item_info_div'>
                    <p className='museum_name'>{item.name}</p>
                    <div>
                        <span>{locationIcon}</span>
                        {
                            privateTicketRegions.map((el, index) => Object.keys(el)[0] === item.region ? <span className='museum_section_item_info_div_location' key={index} >{Object.values(el)[0]}</span> : '')
                        }
                    </div>
                </div>
            </div>
        }

        )


    return (
        <div className='slide-section'>


            <div className='container'>
                <div className='lines_div_section_museum'>
                    <img src={require('../../images/line_gold.png')} alt="line" />
                    <h2>{t('museum_slide_title.0')}</h2>
                    <img src={require('../../images/line_gold.png')} alt="line" />
                </div>
                <div className='slide-section-items'>
                    <Carousel showDots={true}
                        responsive={responsive}
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={4000}
                        keyBoardControl={true}
                        containerClass='carousel-container'
                        dotListClass='custom-dot-list-style'
                        itemClass='carousel-item-padding-40-px'
                    >
                        {product}
                    </Carousel>
                </div>
            </div>
        </div>
    )
}

export default MuseumSectionSliderInHome
