import React, { useRef, useState, useEffect, useCallback, memo } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { SendButtonMessages } from '../../iconFolder/icon';
import MessagesBotBlock from './MessagesBotBlock';
import { useDispatch, useSelector } from 'react-redux';
import { postUserMessages } from '../../store/slices/NewMessagesSlice/NewMessagesSliceApi';
import StartMessagesBlock from './StartMessagesBlock';

const NotUserMessagesBlock = () => {
   const { t, i18n } = useTranslation();

   const { dataEducationalPrograms, dataMuseumOne } = useSelector((store) => store.museumPages);
   const { messagesType, educationProgramType } = useSelector((store) => store.messagesBot);

   const [disabled, setDisabled] = useState(true);
   const [messagesUser, setMssagesUser] = useState([]);
   const [startChat, setStartChst] = useState(false);

   const textareaRef = useRef();
   const dispatch = useDispatch();
   useEffect(() => {
      if (dataEducationalPrograms.length) {
         if (messagesType === 'educational_program' && educationProgramType) {
            setDisabled(false);
         } else if (messagesType) {
            setDisabled(false);
         }
      } else if (messagesType) {
         setDisabled(false);
      } else {
         setDisabled(true);
      }
   }, [messagesType, educationProgramType]);

   const resetMessages = useCallback(() => {
      setMssagesUser([]);
   }, []);

   const validationSchema = yup.object().shape({
      email: yup.string().email(t('validation_inp.0')).required(t('validation_inp.1')),
      messages: yup.string().required(t('validation_inp.1')),
   });

   const handleLogin = (e, handleSubmit, isValid) => {
      handleSubmit();
      e.preventDefault();
      const { email, messages } = e.target;

      if (email.value && messages.value && isValid) {
         const newMessages = {
            email: email.value,
            text: messages.value,
            museum_id: dataMuseumOne.id,
            title: messagesType,
            education_program_type: educationProgramType,
         };
         setMssagesUser([...messagesUser, messages.value]);
         dispatch(postUserMessages(newMessages));
      }
   };

   const onClickButtonStart = useCallback(() => {
      setStartChst(true);
   }, []);

   return (
      <>
         <div className="messages_chatList">
            {startChat ? (
               <MessagesBotBlock messagesUser={messagesUser} resetMessages={resetMessages} />
            ) : (
               <StartMessagesBlock txt={'startMessages.1'} onClick={onClickButtonStart} />
            )}
         </div>
         <Formik
            initialValues={{
               email: '',
               messages: '',
            }}
            onSubmit={(values, { resetForm }) => {
               // resetForm();
               textareaRef.current.value = '';
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
                  className="NotUserMessages-form"
                  onSubmit={(e) => handleLogin(e, handleSubmit, isValid)}>
                  {/* <span>{t('login_btn')}</span> */}
                  <div className="email-inp">
                     <input
                        disabled={disabled}
                        className="messages_block-inpEmail"
                        type="email"
                        name="email"
                        placeholder={t('placeholder.0')}
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                     />
                     {touched.email && errors.email && <p className="error_formik">{errors.email}</p>}
                  </div>

                  <div style={{ position: 'relative' }}>
                     {/* <input
                        type="text"
                        name="messages"
                        placeholder={t('placeholder.8')}
                        value={values.messages}
                        onChange={handleChange}
                        onBlur={handleBlur}
                     /> */}
                     <textarea
                        ref={textareaRef}
                        disabled={disabled}
                        className="messages_block-textArea"
                        type="text"
                        name="messages"
                        placeholder={t('placeholder.8')}
                        value={values.messages}
                        onChange={handleChange}
                        onBlur={handleBlur}></textarea>
                     {touched.messages && errors.messages && (
                        <p className="error_textarea">{errors.messages}</p>
                     )}
                     <button type="submit" className="sendMessages_btn">
                        <SendButtonMessages fill="#3F3D56" />
                     </button>
                  </div>
               </form>
            )}
         </Formik>
      </>
   );
};

export default memo(NotUserMessagesBlock);
