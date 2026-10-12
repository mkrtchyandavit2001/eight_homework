import React, { useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import './LoginPage.css';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { postLogin } from '../../store/slices/LoginSlice/LoginApi';
import { postGoogleLogin } from '../../store/slices/GoogleLoginSlice/GoogleLoginApi';
import { selectLogin } from '../../store/slices/LoginSlice/LoginSlice';
import VerificationLogin from '../VerificationLogin/VerificationLogin';
import { selectgoogleLogin } from '../../store/slices/GoogleLoginSlice/GoogleLoginSlice';

function LoginPage() {
   const [openVerifyModal, setOpenVerifyModal] = useState(false)
   const leng = localStorage.getItem('lang');
   const { t, i18n } = useTranslation();
   const respLogin = useSelector(selectLogin);
   const respGoogleLogin = useSelector(selectgoogleLogin);
   const emailRef = useRef(null)
   const dispatch = useDispatch();

   const validationSchema = yup.object().shape({
      email: yup.string().email(t('validation_inp.0')).required(t('validation_inp.1')),
      password: yup.string().required(t('validation_inp.1')),
   });

   const handleLogin = async(e, handleSubmit, isValid) => {
      handleSubmit();
      e.preventDefault();
      const { email, password } = e.target;

      if (email.value && password.value && isValid) {
         const loginObj = {
            email: email.value,
            password: password.value,
         };

        await dispatch(postLogin(loginObj));
         
      
      }
   };

   useEffect(() => {
      Object.hasOwn(respLogin.data, "is_verify") && setOpenVerifyModal(true)
   },[respLogin.data]) 

   return (
      <div className="login_page">
         <div className="container">
            <div className="login_block">
               <div className="login_block_navigation">
                  <NavLink
                     className={({ isActive }) => (isActive ? 'active-element' : '')}
                     to={`/${leng}/login`}>
                     {t('login_btn')}
                  </NavLink>
                  <NavLink
                     className={({ isActive }) => (isActive ? 'active-element' : '')}
                     to={`/${leng}/register`}>
                     {t('register_btn')}
                  </NavLink>
               </div>
               <Formik
                  initialValues={{
                     email: '',
                     password: '',
                  }}
                  onSubmit={(values, { resetForm }) => {
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
                     <form
                        className="login"
                        onSubmit={(e) => handleLogin(e, handleSubmit, isValid)}>
                        <h4 style={{fontWeight:'300'}}>{t('login_btn')}</h4>
                        <div className="email-inp">
                           <input
                              ref = {emailRef}
                              type="email"
                              name="email"
                              placeholder={t('placeholder.0')}
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                           />
                           {touched.email && errors.email && (
                              <p className="error_formik">{errors.email}</p>
                           )}
                        </div>

                        <div className="password">
                           <input
                              type="password"
                              name="password"
                              placeholder={t('placeholder.1')}
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                           />
                           {touched.password && errors.password && (
                              <p className="error_formik">{errors.password}</p>
                           )}
                        </div>

                        <p className="login_error_message">{respLogin?.data?.message}</p>

                        <button className="login_btn">{t('login_btn')}</button>

                        <p>
                           {t('reset_password_btn.0')}{' '}
                           <NavLink
                              className="reset-password-send-email"
                              to={`/${leng}/reset-password-send-email`}>
                              {t('reset_password_btn.1')}
                           </NavLink>
                        </p>
                        <p>
                           {t('redirect_register.0')}{' '}
                           <NavLink className="redirect_register" to={`/${leng}/register`}>
                              {t('redirect_register.1')}
                           </NavLink>
                        </p>

                        <GoogleLogin
                           onSuccess={(credentialResponse) => {
                              const decodedHeader = jwtDecode(credentialResponse.credential);

                              const loginWithGoogleObj = {
                                 token: credentialResponse.credential,
                              };

                              
                              dispatch(postGoogleLogin(loginWithGoogleObj));
                           }}
                           onError={() => {
                              console.log('Login Failed');
                           }}
                        />

                        {respGoogleLogin.data.error && <p className="login_error_message">{respGoogleLogin.data.error.message}</p>}
                        
                     </form>
                  )}
               </Formik>

               

            </div>
         </div>
         {openVerifyModal && <VerificationLogin email={emailRef} {...{setOpenVerifyModal}}/>}

        
      </div>
   );
}

export default LoginPage;
