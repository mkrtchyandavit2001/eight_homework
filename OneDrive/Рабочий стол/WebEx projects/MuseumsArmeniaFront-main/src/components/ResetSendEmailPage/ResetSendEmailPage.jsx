import React, { useRef, useState } from 'react'
import { Formik } from "formik";
import * as yup from 'yup';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import './ResetSendEmailPage.css'
import VerificationEmailComponent from '../VerificationEmailComponent/VerificationEmailComponent';
import { postResetPasswordWithEmail } from '../../store/slices/ResetPasswordWithEmailSlice/ResetPasswordWithEmailApi';
import { selectResetPasswordWithEmail } from '../../store/slices/ResetPasswordWithEmailSlice/ResetPasswordWithEmailSlice';

function ResetSendEmailPage() {
    const leng = localStorage.getItem('lang')
    const [openVerifyModal, setOpenVerifyModal] = useState(false)
    const {t, i18n} = useTranslation()
    const emailRef = useRef(null)
    const respForgotPass = useSelector(selectResetPasswordWithEmail)


    const dispatch = useDispatch()

    const validationSchema = yup.object().shape({
        email: yup.string().email(t('validation_inp.0')).required(t('validation_inp.1')),
    })

    const handleResetEmail = (e, handleSubmit, isValid) => {
        handleSubmit()
        e.preventDefault()
        const {email} = e.target

        if (email.value && isValid) {
            const loginObj = {
                email: email.value,
            }
            dispatch(postResetPasswordWithEmail(loginObj))
            setOpenVerifyModal(true)

        }
    }


  return (
    <div className='reset_password_send_email_page'>
        <div className='container'>
            <div className='reset_password_send_email_block'>
    
                <Formik
                            initialValues={{
                                email: '',
                            }}

                            onSubmit={(values, { resetForm }) => {

                            }}

                            validateOnBlur

                            validationSchema={validationSchema}
                        >

                            {
                                ({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                                    <form className="reset_password_send_email" onSubmit={(e) => handleResetEmail(e, handleSubmit, isValid)}>
                                            <div className='reset_password_send_email_title_div'>
                                                <p>{t('reset_password.0')}</p>
                                                <span>{t('reset_password.1')}</span>
                                            </div>
                                            <div className="email-inp">
                                                <input  ref={emailRef} type="email" name="email" placeholder={t('placeholder.0')} value={values.email} onChange={handleChange} onBlur={handleBlur} />
                                                {touched.email && errors.email && <p className="error_formik">{errors.email}</p>}
                                            </div>

                                            {respForgotPass.data.error && <p className="login_error_message">{respForgotPass.data.error.message}</p>}


                                        <button className='reset_password_send_email_btn'>{t('buttons.2')}</button>

                                         <NavLink className="redirect_login" to={`/${leng}/login`}>{t('login_btn')}</NavLink>

                                    </form>
                                )
                            }
                        </Formik>
            </div>
        </div>

        {openVerifyModal && <VerificationEmailComponent email={emailRef} {...{setOpenVerifyModal}}/>}
    </div>
  )
}

export default ResetSendEmailPage