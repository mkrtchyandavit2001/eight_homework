import React from 'react';
import './PrivacyPolicy.css';
import { useTranslation } from 'react-i18next';

function PrivacyPolicy() {
    const {t, i18n} = useTranslation()
  return (
    <div className='privacy_policy_page'>
       <div className='container'>
          <div className='privacy_policy_page_block'>
                <div className='privacy_policy_page_block_title'>
                    <div className='lines_div'>
                        <img className='border_1' src={require('../../images/Line 106.png')} alt="" />
                        <h2>{t('privacyPolisyTitle')}</h2>
                        <img className='border_2' src={require('../../images/Line 106.png')} alt="" />
                    </div>
                </div>

                <div className='privacy_policy_page_block_info'>
                    <div className='privacy_policy_page_block_info_left_div'>
                        <div className='line_left_div'><img src={require('../../images/line_left.png')} alt="" /></div>

                        <div>
                            <p>{t('privacyPolisy_left_div.0')}</p>
                            <p>{t('privacyPolisy_left_div.1')}</p>
                        </div>

                        <div>
                            <p>{t('privacyPolisy_left_div.2')}</p>
                            <p>{t('privacyPolisy_left_div.3')}</p>
                        </div>

                        <div className='privacy_policy_page_block_info_left_div_list_div'>
                                <div>
                                    <p>{t('privacyPolisy_left_div.4')}</p>
                                    <p>{t('privacyPolisy_left_div.5')}</p>
                                </div>
                                <ul className='privacy_policy_page_block_info_left_div_list'>
                                    <li>{t('privacyPolisy_left_div.6')}</li>
                                    <li>{t('privacyPolisy_left_div.7')}</li>
                                    <li>{t('privacyPolisy_left_div.8')}</li>
                                    <li>{t('privacyPolisy_left_div.9')}</li>
                                </ul>
                        </div>
                    </div>

                    <div className='privacy_policy_page_block_info_right_div'>
                        <div className='privacy_policy_page_block_info_right_div_img_div'>
                            <img src={require('../../images/privacyPolicy.png')} alt="" />
                        </div>

                        <div className='privacy_policy_page_block_info_right_div_text_div'>
                            <div>
                                <p>{t('privacyPolisy_right_div.0')}</p>
                                <p>{t('privacyPolisy_right_div.1')}</p>
                            </div>
                            <ul>
                                <li>{t('privacyPolisy_right_div.2')}</li>
                                <li>{t('privacyPolisy_right_div.3')}</li>
                                <li>{t('privacyPolisy_right_div.4')}</li>
                                <li>{t('privacyPolisy_right_div.5')}</li>
                            </ul>
                        </div>

                        <div className='line_right_div'><img src={require('../../images/line_right.png')} alt="" /></div>
                    </div>
                </div>
          </div>
       </div>
    </div>
  );
}

export default PrivacyPolicy;
