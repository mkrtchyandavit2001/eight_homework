// FooterComponent.js
import React, { useEffect, useState } from 'react';
import './FooterComponent.css';
import NavMenuItem from '../NavMenuItem/NavMenuItem';
import { appleIcon, cIcon, footeremailIcon, footerLocationIcon, footerTelIcon, googlePlayIcon, locationIcon, MailIcon, webexLogo } from '../../iconFolder/icon';
import  {TelIcon}  from '../../iconFolder/icon';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { LocationIcon } from '../../iconFolder/icon';


function FooterComponent() {
    const [openFooter, setOpenFooter] = useState(false);
    const {t, i18n} = useTranslation()

    const {pathname} = useLocation()
    const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang')  : 'am';
    const nowDate = new Date().getFullYear()
    


    useEffect(() => {
        const handleScroll = () => {
            const homePageElement = document.querySelector('.home_page');
            if (homePageElement) {
                if (pathname === `/${leng}/`) {
                    if (window.scrollY >= homePageElement.clientHeight - 900) {
                        setOpenFooter(true);
                    } else {
                        setOpenFooter(false);
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component is unmounted
        return () => {
            window.removeEventListener('scroll', handleScroll);
            setOpenFooter(false);
        };
    }, [pathname, leng]);

    return (
        <footer className={pathname === `/${leng}/` ? "footerComponent" : "footerComponentStatic"} style={{ transform: openFooter  ? 'translateY(-35px)' : 'translateY(100%)' }}>
            <div className='container'>
                <div className="footerComponent_img_div">
                    <img src={require('../../images/hh.png')} alt="Zinanshan" />
                    <p>{t('footer_title')}</p>
                </div>
                <div className='footer_menu'>
                    <ul className='footer_menu_part_1'>
                        <NavMenuItem path='/aboute-us' txt='5'/>
                        <NavMenuItem path='/store' txt='3'/>
                        <NavMenuItem path='/events' txt='2'/>
                        <NavMenuItem path='/contact' txt='6'/>
                        <NavMenuItem path='/FAQ' txt='7'/>
                    </ul>

                    <ul className='footer_menu_part_2'>
                    
                    <NavMenuItem path='/ticket-sale' txt='8'/>
                    <NavMenuItem path='/privacy-policy' txt='9'/>
                        <div className='apple_and_play_market'>
                            <p>{t('app_stor_and_google_play')}</p>
                            <div>
                                <a href='https://apps.apple.com/gh/app/museum-armenia/id6502233302' target='_blanc'>
                                    <span>{appleIcon}</span>
                                    <span>App Store</span>
                                </a>
                                <a href='https://play.google.com/store/apps/details?id=com.armenian.museums' target='_blanc'>
                                    <span>{googlePlayIcon}</span>
                                    <span>Google Play</span>
                                </a>
                            </div>
                        </div>
                    </ul>


                    <ul className='footer_menu_part_3'>
                        <a href="https://www.google.com/maps/place/%D5%80%D5%A1%D5%B5%D5%A1%D5%BD%D5%BF%D5%A1%D5%B6%D5%AB+%D5%B0%D5%A1%D5%B6%D6%80%D5%A1%D5%BA%D5%A5%D5%BF%D5%B8%D6%82%D5%A9%D5%B5%D5%A1%D5%B6+%D5%AF%D6%80%D5%A9%D5%B8%D6%82%D5%A9%D5%B5%D5%A1%D5%B6,+%D5%A3%D5%AB%D5%BF%D5%B8%D6%82%D5%A9%D5%B5%D5%A1%D5%B6,+%D5%B4%D5%B7%D5%A1%D5%AF%D5%B8%D6%82%D5%B5%D5%A9%D5%AB+%D6%87+%D5%BD%D5%BA%D5%B8%D6%80%D5%BF%D5%AB+%D5%B6%D5%A1%D5%AD%D5%A1%D6%80%D5%A1%D6%80%D5%B8%D6%82%D5%A9%D5%B5%D5%B8%D6%82%D5%B6/@40.1771741,44.5047257,17z/data=!4m14!1m7!3m6!1s0x406abcfa7ecb6691:0x646d566291ff4b8f!2z1YDVodW11aHVvdW_1aHVttWrINWw1aHVttaA1aHVutWl1b_VuNaC1anVtdWh1bYg1a_WgNWp1bjWgtWp1bXVodW2LCDVo9Wr1b_VuNaC1anVtdWh1bYsINW01bfVodWv1bjWgtW11anVqyDWhyDVvdW61bjWgNW_1asg1bbVodWt1aHWgNWh1oDVuNaC1anVtdW41oLVtg!8m2!3d40.1771701!4d44.5095966!16s%2Fg%2F119tmj780!3m5!1s0x406abcfa7ecb6691:0x646d566291ff4b8f!8m2!3d40.1771701!4d44.5095966!16s%2Fg%2F119tmj780?entry=ttu" target='_blanc'>
                            <span>{footerLocationIcon}</span>
                            <span htmlFor="location">{t('location_name')}</span>
                        </a>
                        {/* <a href="tel:+374(10)25-08-25">
                            <span>{footerTelIcon}</span>
                            <span htmlFor="phone">+374(10)59-96-09</span>
                        </a> */}

                        <div className='footer_mail_div'>
                            <span>{footeremailIcon}</span>
                            <a href="mailto:info@escs.am" htmlFor="mail">info@escs.am, </a> 
                            <a href="mailto:secretariat@escs.am" htmlFor="mail">secretariat@escs.am</a>
                        </div>

                    </ul>
                </div>
            </div>

            <div className='footer_botom'>
                <div className='container'>
                    <div className='footer_botom_text'>
                        <div><span className='cIcon'>{cIcon}</span> <span>{nowDate + t('footer_botom')}</span></div>
                        <a href="https://www.webex.am/am/" target='_blanc'>
                            <span>{webexLogo}</span>
                            <span>Webex Technologies LLC</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default FooterComponent;
