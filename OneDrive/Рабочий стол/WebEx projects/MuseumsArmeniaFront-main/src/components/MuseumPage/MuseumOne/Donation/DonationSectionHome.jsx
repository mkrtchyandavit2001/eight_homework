import React from 'react'
import './Donation.css'
import Button from '../../../Button/Button'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
function DonationSectionHome() {
  const {t, i18n} = useTranslation()
  const navigate = useNavigate();
  return (
    <div className='donaion_section_home'>
        <div className="container">
          <h2>{t('donationSectionHome.title')}</h2>
          <p>{t('donationSectionHome.description')}</p>

          <Button txt="13" onClick={() => navigate(`/${i18n.language}/museums`)}/>
        </div>
    </div>
  )
}

export default DonationSectionHome