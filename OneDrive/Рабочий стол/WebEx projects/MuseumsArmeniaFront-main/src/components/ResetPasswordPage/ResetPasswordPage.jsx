import React, { useEffect, useRef, useState } from 'react'
import './ResetPasswordPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Formik } from 'formik'
import * as yup from 'yup';
import { eyeIcon } from '../../iconFolder/icon'
import { postCheckForgotToken } from '../../store/slices/CheckForgotTokenSlice/CheckForgotTokenApi'
import { selectCheckForgotToken } from '../../store/slices/CheckForgotTokenSlice/CheckForgotTokenSlice'
import { postNewPassword } from '../../store/slices/NewPasswordeSlise/NewPasswordeApi'
import { selectNewPassword } from '../../store/slices/NewPasswordeSlise/NewPasswordeSlise'

function ResetPasswordPage() {
    const { t, i18n } = useTranslation();
    const [viewPassword, setViewPassword] = useState(true)
    const [viewConfirmPassword, setConfirmViewPassword] = useState(true)
    const errMessage = useSelector(selectCheckForgotToken)
    const respNewPassword = useSelector(selectNewPassword)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const validationSchema = yup.object().shape({
        password: yup.string()
        .min(8, t('validation_inp.2'))
        .matches(/[0-9]/, t('validation_inp.3'))
        .matches(/[a-z]/, t('validation_inp.4'))
        .matches(/[A-Z]/, t('validation_inp.5'))
        .required(t('validation_inp.6')),
        confirmPassword: yup.string().oneOf([yup.ref('password')], t('validation_inp.7')).required(t('validation_inp.6')),

    })

    const leng = localStorage.getItem('lang')

    useEffect(() => {
        const fetchData = async () => {
            const token_andemail_obj = {
                email: sessionStorage.getItem('verificationEmail'),
                token: sessionStorage.getItem('verificationToken')
            };
    
            await dispatch(postCheckForgotToken(token_andemail_obj));
            if (errMessage.data.success === false) {
               navigate(`/${leng}/login`)
            }
            else{
                console.log('voch');
            }
        };
    
        fetchData();
    }, [dispatch, errMessage.data.success]);

    const handleResetPass = async(e, handleSubmit, dirty, isValid) => {
        e.preventDefault();
        handleSubmit();
    
    
            const [password, confirmPassword] = e.target;
            const newPasswordeObj = {
                password: password.value,
                confirmPassword: confirmPassword.value,
                email: sessionStorage.getItem('verificationEmail')
            }
            
            if(password.value && confirmPassword.value && (password.value === confirmPassword.value) && isValid){
               await dispatch(postNewPassword(newPasswordeObj))

               if (respNewPassword.data.success === true) {
                    window.location.pathname = `/${leng}/login`
               }
            }

    }

    
    return (
        <div className='reset-password-page'>
            
                    <div className='container'>
                        <div className='reset_password_block'>
                        <Formik
                            initialValues={{
                                confirmPassword: '',
                                password: '',
                            }}

                            onSubmit={(values, { resetForm }) => {


                            }}

                            validateOnBlur

                            validationSchema={validationSchema}
                        >

                            {
                                ({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                                    <form className="reset_password_form" onSubmit={(e) => handleResetPass(e, handleSubmit, dirty, isValid)}>
                                        <div className='reset_password_title'>
                                            <p>{t('reset_password.2')}</p>
                                        </div>
                                        <div className="reset-password-inp inp_div">
                                            <input type={viewPassword ? 'password' : 'text'} name="password" placeholder={t('placeholder.1')} value={values.email} onChange={handleChange} onBlur={handleBlur} />
                                            <span onClick={() => setViewPassword(!viewPassword)}>{eyeIcon}</span>
                                            {touched.password && errors.password && <p className="error_formik">{errors.password}</p>}
                                        </div>

                                        <div className="confirm-password-inp inp_div">
                                            <input type={viewConfirmPassword ? 'password' : 'text'} name="confirmPassword" placeholder={t('placeholder.6')} value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} />
                                            <span onClick={() => setConfirmViewPassword(!viewConfirmPassword)}>{eyeIcon}</span>
                                            {touched.confirmPassword && errors.confirmPassword && <p className="error_formik">{errors.confirmPassword}</p>}
                                        </div>

                                        <button className='reset_password'>{t('buttons.2')}</button>

                                    </form>
                                )
                            }
                        </Formik>
                        </div>
                    </div>
            
        </div>
    )
}

export default ResetPasswordPage