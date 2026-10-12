import React, { useEffect, useRef, useState } from 'react'
import './RegisterPage.css'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Formik } from "formik";
import * as yup from 'yup';
import { selectIcon } from '../../iconFolder/icon';
import { useDispatch, useSelector } from 'react-redux';
import { postRegister } from '../../store/slices/RegisterSlice/RegisterApi';
import VerificationComponent from '../VerificationComponent/VerificationComponent';
import { selectRegisterData } from '../../store/slices/RegisterSlice/RegisterSlice';
import { postRepeatVerifyCode } from '../../store/slices/RepeatVerifyCodeSlice/RepeatVerifyCodeApi';

function RegisterPage() {
    const leng = localStorage.getItem('lang')
    const {t, i18n} = useTranslation()
    const [openVerifyModal, setOpenVerifyModal] = useState(false)
    const [countryVal, setCountryVal] = useState('')
    const [countryType, setCountryType] = useState('')
    const emailRef = useRef(null)
    const {message, success} = useSelector(selectRegisterData)
    const dispatch = useDispatch()

    const handleChangeCountry =(val, type) => {
        setCountryType(type)
        setCountryVal(val)
    }
    
    

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const apiKey = '126229d4c935438e900fd61e54eb2b11';
          const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=en&pretty=1`;

          fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
              const country = data.results[0].components.country;
              const country_code = data.results[0].components.country_code;
              setCountryType(country_code)
              setCountryVal(country);
            })
            .catch((error) => {
              console.error('Error fetching location data:', error);
            });
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

    const validationSchema = yup.object().shape({
        name: yup.string(),
        lastName: yup.string(),
        email: yup.string().email(t('validation_inp.0')).required(t('validation_inp.1')),
        password: yup.string()
        .min(8, t('validation_inp.2'))
        .matches(/[0-9]/, t('validation_inp.3'))
        .matches(/[a-z]/, t('validation_inp.4'))
        .matches(/[A-Z]/, t('validation_inp.5'))
        .required(t('validation_inp.6')),
        confirmPassword: yup.string().oneOf([yup.ref('password')], t('validation_inp.7')).required(t('validation_inp.6')),
        phone: yup.string().matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, t('validation_inp.8')),
        country: yup.string(),
        age: yup.string(),
        gender: yup.string()
    })

    const handleRegister = (e, handleSubmit, isValid) => {
        handleSubmit()
        e.preventDefault()

        const {name, lastName, email, password, confirmPassword, phone, country, age, gender} = e.target
        if (email.value && isValid) {
            const registerObj = {
                name: name.value,
                surname: lastName.value,
                email: email.value, 
                password: password.value,
                confirmPassword: confirmPassword.value,
                phone: phone.value,
                country: countryType,
                birth_date: age.value,
                gender: gender.value
            }

             dispatch(postRegister(registerObj))
               setOpenVerifyModal(true)
            
        }
    }


    const countries = t('country', {returnObjects: true})

  return (
    <div className='register_page'>
        <div className='container'>
            <div className='register_block'>
                <div className='register_block_navigation'>
                        <NavLink className={({isActive})=> isActive ? 'active-element':''} to={`/${leng}/login`}>{t('login_btn')}</NavLink>
                        <NavLink className={({isActive})=> isActive ? 'active-element':''} to={`/${leng}/register`}>{t('register_btn')}</NavLink>
                </div>

                <span>{t('register_text.0')}</span>

                <Formik
                            initialValues={{
                                name: '',
                                lastName: '',
                                email: '',
                                password: '',
                                confirmPassword: '',
                                phone: '',
                                country: '',
                                age: '',
                                gender: ''
                            }}

                            onSubmit={(values, { resetForm }) => {

                                // resetForm()
                            }}

                            validateOnBlur

                            validationSchema={validationSchema}
                        >

                            {
                                ({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                                    <form className="register" onSubmit={(e) => handleRegister(e, handleSubmit, isValid)}>

                                            <div className='full_name_div'>
                                                <span>{t('register_text.1')}</span>
                                                <div className="name-inp">
                                                    <input type="text" name="name" placeholder={t('placeholder.3')} value={values.name} onChange={handleChange} onBlur={handleBlur} />
                                                    {touched.name && errors.name && <p className="error_formik">{errors.name}</p>}
                                                </div>

                                                <div className="lastName-inp">
                                                    <input type="text" name="lastName" placeholder={t('placeholder.4')} value={values.lastName} onChange={handleChange} onBlur={handleBlur} />
                                                    {touched.lastName && errors.lastName && <p className="error_formik">{errors.lastName}</p>}
                                                </div>
                                            </div>

                                            <div className='pasword_and_email_div'>
                                                <span>{t('register_text.2')}</span>
                                                <div className="email-inp">
                                                    <input ref={emailRef} type="email" name="email" placeholder={t('placeholder.5')} value={values.email} onChange={handleChange} onBlur={handleBlur} />
                                                    {touched.email && errors.email && <p className="error_formik">{errors.email}</p>}
                                                </div>

                                                <div className="password">
                                                    <input type="password" name="password" placeholder={t('placeholder.1')} value={values.password} onChange={handleChange} onBlur={handleBlur}/>
                                                    {touched.password && errors.password && <p className="error_formik">{errors.password}</p>}

                                                </div>

                                                <div className="confirmPassword">
                                                    <input type="password" name="confirmPassword" placeholder={t('placeholder.6')} value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur}/>
                                                    {touched.confirmPassword && errors.confirmPassword && <p className="error_formik">{errors.confirmPassword}</p>}
                                                    
                                                </div>
                                            </div>

                                            <div className="phone-inp">
                                                <span>{t('register_text.3')}</span>
                                                <input type="text" name="phone" placeholder={t('placeholder.7')} value={values.phone} onChange={handleChange} onBlur={handleBlur} />
                                                {touched.phone && errors.phone && <p className="error_formik">{errors.phone}</p>}
                                            </div>

                                            <div className='age_and_country_div'>
                                                <span>{t('register_text.4')}</span>
                                                <div className="country-inp">
                                                    <input type="text" name="country" placeholder={t('placeholder.10')} value={countryVal}  onChange={handleChange} onBlur={handleBlur} />
                                                    <div className='country_div'>
                                                            
                                                            {
                                                                countries.map((value, index)=>(
                                                                    <div  key={index} onClick={() => handleChangeCountry(Object.values(value)[0], Object.keys(value)[0])}>
                                                                        {Object.values(value)[0]}
                                                                    </div>
                                                                ))

                                                                }
                                                                
                                                    </div>
                                                    {touched.country && errors.country && <p className="error_formik">{errors.country}</p>}

                                                    <span className='selectIcon'>{selectIcon}</span>
                                                </div>

                                                <div className="age-inp">
                                                    <input type="date" name="age" placeholder="age" value={values.age} onChange={handleChange} onBlur={handleBlur} />
                                                    {touched.age && errors.age && <p className="error_formik">{errors.age}</p>}
                                                </div>
                                            </div>

                                            <div className='gender_inp'>
                                                <span>{t('register_text.5')}</span>
                                                <div>
                                                    <label>
                                                        <span>{t('gender_type.0')}</span>
                                                        <input type="radio" value= "female" name='gender' />
                                                    </label>

                                                    <label>
                                                        <span>{t('gender_type.1')}</span>
                                                        <input type="radio" value= "male" name='gender' />
                                                    </label>

                                                    <label>
                                                        <span>{t('gender_type.2')}</span>
                                                        <input type="radio" value = "other" name='gender' />
                                                    </label>
                                                </div>
                                            </div>

                                            {
                                             !success && <span style={{color: 'red'}}>{message}</span>
                                            }
                                        <button type='submit' className='register_btn'>{t('register_btn')}</button>

                                    </form>
                                )
                            }

                        </Formik>

                    {openVerifyModal && <VerificationComponent email={emailRef} {...{setOpenVerifyModal}}/>}
            </div>
        </div>
    </div>
  )
}

export default RegisterPage