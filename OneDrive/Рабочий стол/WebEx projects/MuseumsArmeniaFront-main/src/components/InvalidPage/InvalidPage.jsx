import React from 'react'
import './InvalidPage.css'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

function InvalidPage() {
    const {t, i18n} = useTranslation()
    const navigate = useNavigate()
    const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';
  return (
    <div className='invalid_page'>
        <div className="container">
            <div className="invalid_page_btn_div">
                <button className='invalid_page_btn' onClick={() => navigate(`/${leng}/`)}>{t('invalidPage.0')}</button>
            </div>
           <div className="invalid_page_block">
                <h1>{t('invalidPage.1')}</h1>
           </div>
        </div>
    </div>
  )
}

export default InvalidPage