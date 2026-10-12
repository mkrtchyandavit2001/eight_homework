import React, { memo, useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
   postUserMessages,
   deleteMuseumMessages,
   getAuthUserAllMessages,
} from '../../store/slices/NewMessagesSlice/NewMessagesSliceApi';
import { setDataMuseumMessages } from '../../store/slices/NewMessagesSlice/NewMessagesSlice';
import UserChatList from './UserChatList';
import MessagesBotBlock from './MessagesBotBlock';
import { SendButtonMessages } from '../../iconFolder/icon';
import ButtonSecond from '../ButtonSecond/ButtonSecond';
import StartMessagesBlock from './StartMessagesBlock';

const MessagesBlock = ({ dataMuseumMessages, authUser }) => {
   const { t, i18n } = useTranslation();
   const { dataEducationalPrograms, dataMuseumOne } = useSelector((store) => store.museumPages);
   const { messagesType, educationProgramType } = useSelector((store) => store.messagesBot);
   const [startChat, setStartChst] = useState(false);
   const [disabled, setDisabled] = useState(true);
   const [messagesUser, setMssagesUser] = useState([]);
   const [statusMessages, setStatusMessages] = useState(null);
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

   useEffect(() => {
      dispatch(getAuthUserAllMessages(dataMuseumOne.id));
   }, []);

   const onClickButtonStart = React.useCallback(() => {
      setStartChst(true);
   }, []);

   const resetMessages = React.useCallback(() => {
      setMssagesUser([]);
   }, []);

   const clearMessagesUser = React.useCallback((boolean) => {
      if (boolean) {
         setStatusMessages(true);
         setDisabled(false);
      } else {
         dispatch(deleteMuseumMessages(dataMuseumMessages.chat_id));
         setStatusMessages(false);
         dispatch(setDataMuseumMessages([]));
      }
   }, []);

   const validationSchema = yup.object().shape({
      messages: yup.string().required(t('validation_inp.1')),
   });

   // const addMessagesResponse = async()=> {
   //    const messages = await responseUsersMessages
   //    setResMessages((prevMesages) => {
   //       if (prevMesages.length) {
   //          return [...prevMesages, messages]
   //       }
   //       return [messages]
   //    })
   // }

   const handleLogin = React.useCallback(
      (e, handleSubmit, isValid) => {
         handleSubmit();
         e.preventDefault();
         const { messages } = e.target;

         if (messages.value && isValid) {
            const newMessages = {
               email: authUser.email,
               text: messages.value,
               museum_id: dataMuseumOne.id,
               title: messagesType || dataMuseumMessages.title,
               education_program_type: educationProgramType,
            };
            setMssagesUser([...messagesUser, messages.value]);
            dispatch(postUserMessages(newMessages));
         }
      },
      [messagesType, dataMuseumMessages.title, educationProgramType, messagesUser],
   );

   return (
      <>
         <div className="messages_chatList" style={{ height: '100%' }}>
            {dataMuseumMessages?.messages && statusMessages === null ? (
               <div className="warring_messages">
                  <h3>{t(`warningMessages`)}</h3>
                  <div className="warring_messages-button">
                     <ButtonSecond
                        txt={6}
                        minWidth="120px"
                        onClick={() => clearMessagesUser(true)}
                     />
                     <ButtonSecond
                        txt={7}
                        minWidth="120px"
                        onClick={() => clearMessagesUser(false)}
                     />
                     {/* <button onClick={() => clearMessagesUser(true)}>ayo</button>
                     <button onClick={() => clearMessagesUser(false)}>voch</button> */}
                  </div>
               </div>
            ) : statusMessages ? (
               <UserChatList messagesUser={messagesUser} dataMuseumMessages={dataMuseumMessages} />
            ) : startChat ? (
               <MessagesBotBlock messagesUser={messagesUser} resetMessages={resetMessages} />
            ) : (
               <StartMessagesBlock onClick={onClickButtonStart} txt={'startMessages.0'} />
            )}
         </div>
         <Formik
            initialValues={{
               messages: '',
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
               <form
                  className="NotUserMessages-form"
                  onSubmit={(e) => handleLogin(e, handleSubmit, isValid)}>
                  <div style={{ position: 'relative' }}>
                     <textarea
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

export default memo(MessagesBlock);
