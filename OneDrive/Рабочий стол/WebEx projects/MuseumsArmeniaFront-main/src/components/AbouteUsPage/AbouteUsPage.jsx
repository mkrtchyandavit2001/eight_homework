import React from 'react'
import './AbouteUsPage.css'
import { useTranslation } from 'react-i18next'

function AbouteUsPage() {

    const {t, i18n} = useTranslation()
  return (
    <div className='abote_us_page'>
        <div className='container'>
            <div className='aboute_us_page_block'>
                <div className='aboute_usPage_block_title'>
                    <div className='lines_div'>
                        <img src={require('../../images/Line 106.png')} alt="" />
                        <h2>{t('abouteUsPage_title.0')}</h2>
                        <img src={require('../../images/Line 106.png')} alt="" />
                    </div>
                    <h3>{t('abouteUsPage_title.1')}</h3>
                </div>

                <div className='abote_us_page_block_info'>
                    <div className='abote_us_page_block_info_top_div'>
                        <div className='abote_us_page_block_info_top_div_txt'>
                            <p>{t('abouteUs_page_data.0')}</p>
                        </div>

                        <div className='abote_us_page_block_info_top_div_img'>
                            <img src={require('../../images/anouteUsimage_1.png')} alt="" />
                        </div>

                        <img className='line_1' src={require('../../images/line_right.png')} alt="line" />
                    </div>

                    <div className='abote_us_page_block_info_midle_div'>
                        <div className='abote_us_page_block_info_midle_div_txt'>
                            <p>{t('abouteUs_page_data.1')}</p>
                        </div>

                        <div className='abote_us_page_block_info_midle_div_img'>
                            <img src={require('../../images/anouteUsimage_2.png')} alt="" />
                        </div>

                        <img className='line_2' src={require('../../images/line_left.png')} alt="line" />
                    </div>
                    
                    <div className='abote_us_page_block_info_botom_div'>
                        <div className='abote_us_page_block_info_botom_div_txt'>
                            <p>{t('abouteUs_page_data.2')}</p>
                        </div>

                        <div className='abote_us_page_block_info_botom_div_img'>
                            <img src={require('../../images/anouteUsimage_3.png')} alt="" />
                        </div>

                        <img className='line_3' src={require('../../images/line_right.png')} alt="line" />

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AbouteUsPage