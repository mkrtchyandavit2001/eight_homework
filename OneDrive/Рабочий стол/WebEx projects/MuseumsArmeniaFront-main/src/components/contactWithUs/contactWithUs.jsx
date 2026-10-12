import React, { useEffect, useState } from 'react';
import './contactWithUs.css';
import { useTranslation } from 'react-i18next';
import ContactWithUsmap from '../../images/ContactWithUsmap.png';
import addressLIne from '../../images/addressLIne.png';
import phoneLIne from '../../images/phoneLIne.png';
import mailLIne from '../../images/mailLIne.png';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { postContactUsData } from '../../store/slices/ContactUs/ContactUsApi';
import { getMessage } from '../../store/slices/ContactUs/ContactUsSlice';
import ButtonSecond from '../ButtonSecond/ButtonSecond';


function ContactWithUs() {
  const { t, i18n } = useTranslation();
  const [textValue, setTextValue] = useState('');
  const [activeMessage, setActiveMessage] = useState('');
  const respMessageContact = useSelector(getMessage)

  const dispatch = useDispatch()
  const validationSchema = yup.object().shape({
    name: yup.string().required(t('validation_inp.1')),
    phone: yup
      .string()
      .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, t('validation_inp.8'))
      .required(t('validation_inp.1')),
    email: yup.string().email(t('validation_inp.0')).required(t('validation_inp.1')),
  });


  const handleFeedback = (e, handleSubmit, isValid) => {
    handleSubmit()
    e.preventDefault();
    if (isValid) {
      dispatch(
        postContactUsData({
          name: e.target[0].value,
          phone: e.target[1].value,
          email: e.target[2].value,
          text: e.target[3].value,
        }),
      );
      e.target[0].value = '';
      e.target[1].value = '';
      e.target[2].value = '';
      e.target[3].value = '';
      setTextValue('');
    }
  };


  useEffect(() => {
    setActiveMessage(true)
    setTimeout(() => {
      setActiveMessage(false)
    }, 4000);
    
  }, [respMessageContact])

  const handleTextareaChange = (event) => {
    setTextValue(event.target.value);
  };


  return (
    <div className="contactWithUs_pagee">
      <div className="container">
        <div className="privacy_policy_page_block">
          <div className="privacy_policy_page_block_title">
            <div className="lines_div">
              <img className="border_1" src={require('../../images/Line 106.png')} alt="" />
              <h2 style={{ textTransform: 'uppercase' }}>{t('contactUsPage.0')}</h2>
              <img className="border_2" src={require('../../images/Line 106.png')} alt="" />
            </div>
          </div>

          <div className="contactWithUs_page_block_infoo">
            <h3 className="contactWithUs_title">
              {t('contactUsPage.1')}
            </h3>
            <div className="ContactWithUs_map">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.4330929940647!2d44.50702167594612!3d40.177174170184934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abcfa7ecb6691%3A0x646d566291ff4b8f!2z1YDVodW11aHVvdW_1aHVttWrINWw1aHVttaA1aHVutWl1b_VuNaC1anVtdWh1bYg1a_WgNWp1bjWgtWp1bXVodW2LCDVo9Wr1b_VuNaC1anVtdWh1bYsINW01bfVodWv1bjWgtW11anVqyDWhyDVvdW61bjWgNW_1asg1bbVodWt1aHWgNWh1oDVuNaC1anVtdW41oLVtg!5e0!3m2!1shy!2sam!4v1714987326729!5m2!1shy!2sam" width="100%" height="350" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className="ContactWithUs_info_All_divs" style={{ width: '100%' }}>
              <div className="ContactWithUs_info_div">
                <div className="ContactWithUs_info_div_divs">
                  <img src={addressLIne} alt="addressLIne" />
                  <div className="ContactWithUs_info_div_divs_texts">
                    <span>{t('contactUsPage.2')}</span>
                    <a href="https://www.google.com/maps/place/%D5%80%D5%A1%D5%B5%D5%A1%D5%BD%D5%BF%D5%A1%D5%B6%D5%AB+%D5%B0%D5%A1%D5%B6%D6%80%D5%A1%D5%BA%D5%A5%D5%BF%D5%B8%D6%82%D5%A9%D5%B5%D5%A1%D5%B6+%D5%AF%D6%80%D5%A9%D5%B8%D6%82%D5%A9%D5%B5%D5%A1%D5%B6,+%D5%A3%D5%AB%D5%BF%D5%B8%D6%82%D5%A9%D5%B5%D5%A1%D5%B6,+%D5%B4%D5%B7%D5%A1%D5%AF%D5%B8%D6%82%D5%B5%D5%A9%D5%AB+%D6%87+%D5%BD%D5%BA%D5%B8%D6%80%D5%BF%D5%AB+%D5%B6%D5%A1%D5%AD%D5%A1%D6%80%D5%A1%D6%80%D5%B8%D6%82%D5%A9%D5%B5%D5%B8%D6%82%D5%B6/@40.1771742,44.5070217,17z/data=!4m16!1m9!3m8!1s0x406abcfa7ecb6691:0x646d566291ff4b8f!2z1YDVodW11aHVvdW_1aHVttWrINWw1aHVttaA1aHVutWl1b_VuNaC1anVtdWh1bYg1a_WgNWp1bjWgtWp1bXVodW2LCDVo9Wr1b_VuNaC1anVtdWh1bYsINW01bfVodWv1bjWgtW11anVqyDWhyDVvdW61bjWgNW_1asg1bbVodWt1aHWgNWh1oDVuNaC1anVtdW41oLVtg!8m2!3d40.1771701!4d44.5095966!9m1!1b1!16s%2Fg%2F119tmj780!3m5!1s0x406abcfa7ecb6691:0x646d566291ff4b8f!8m2!3d40.1771701!4d44.5095966!16s%2Fg%2F119tmj780?entry=ttu" style={{ color: '#615F5F' }}>{t('contactUsPage.3')}</a>
                  </div>
                </div>
                {/* <div className="ContactWithUs_info_div_divs">
                  <img src={phoneLIne} alt="phoneLIne" />
                  <div className="ContactWithUs_info_div_divs_texts">
                    <span>{t('contactUsPage.4')}</span>
                    <a href="tel:+374(10)59-96-09" style={{ color: '#615F5F' }}>+374(10)59-96-09</a>
                  </div>
                </div> */}
                <div className="ContactWithUs_info_div_divs">
                  <img src={mailLIne} alt="mailLIne" />
                  <div className="ContactWithUs_info_div_divs_texts">
                    <span>{t('contactUsPage.5')}</span>
                    <a href='mailto:info@escs.am' style={{ color: '#615F5F' }}>info@escs.am</a>
                    <a href="mailto:secretariat@escs.am" style={{ color: '#615F5F' }}>secretariat@escs.am</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="ContactWithUs_contact_all">


              <Formik
                initialValues={{
                  name: '',
                  email: '',
                  phone: '',
                }}
                onSubmit={(values, { resetForm }) => {
                  resetForm();
                }}
                validateOnBlur
                validationSchema={validationSchema}>
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  isValid,
                  handleSubmit,
                  dirty,
                }) => (
                  <form className="feedBack" onSubmit={(e) => handleFeedback(e, handleSubmit, isValid)}>
                    <div className="name-inp">
                      <input
                        type="text"
                        name="name"
                        placeholder={t('contact_us_section.1')}
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.name && errors.name && <p className="error_formik">{errors.name}</p>}
                    </div>

                    <div className="phone_email_div">
                      <div className="phone-inp">
                        <input
                          type="text"
                          name="phone"
                          placeholder={t('contact_us_section.2')}
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.phone && errors.phone && <p className="error_formik">{errors.phone}</p>}
                      </div>

                      <div className="email-inp">
                        <input
                          type="email"
                          name="email"
                          placeholder={t('contact_us_section.3')}
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.email && errors.email && <p className="error_formik">{errors.email}</p>}
                      </div>
                    </div>
                    <div>
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        cols="69"
                        value={textValue}
                        onChange={handleTextareaChange}></textarea>
                    </div>

                    {respMessageContact?.success && activeMessage && <span style={{ color: 'green' }}>{respMessageContact?.message}</span>}

                    <ButtonSecond txt="2" />
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactWithUs;
