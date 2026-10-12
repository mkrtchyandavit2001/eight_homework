import React from 'react'
import './SectionAboteUs.css'
import { useTranslation } from 'react-i18next'

function SectionAboteUs() {

  const {t, i18n} = useTranslation()

  return (
    <div className='section_aboute_us'>
        <div className='container'>

            <div className='lines_div_section_about_us'>
                <img src={require('../../images/line_gold.png')} alt="line" />
                <h2>{t('aboute_us_section_title.1')}</h2>
                <img src={require('../../images/line_gold.png')} alt="line" />
            </div>
            
            <div className='section_aboute_us_info'>
                <div className='section_aboute_us_left_div'>
                <p>{t('abouteUs_section_info')}</p>
            </div>

            <div className='section_aboute_us_right_div'></div>
            </div>
        </div>
    </div>
  )
}

export default SectionAboteUs