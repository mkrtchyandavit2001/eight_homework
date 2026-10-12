import React, { useEffect, useRef, useState } from 'react';
import './ChatProfile.css';
import send from '../../../images/send.png';
import { useDispatch, useSelector } from 'react-redux';
import { getChatProfileData } from '../../../store/slices/ChatProfile/ChatProfileApi';
import {
   getChatProfileDates,
   getChatProfileLoading,
   setNewMessage,
} from '../../../store/slices/ChatProfile/ChatProfileSlice';
import { chatLeftArrow } from '../../../iconFolder/icon';
import { useTranslation } from 'react-i18next';
import {
   postMessageProfile,
   postUserMessages,
} from '../../../store/slices/NewMessagesSlice/NewMessagesSliceApi';
import { getAuthUser } from '../../../store/slices/Auth/AuthSlice';
import LoadSpinner from '../../LoadSpinner/LoadSpinner';
import { currentMessage } from '../../../store/slices/NewMessagesSlice/NewMessagesSlice';
import { type } from '@testing-library/user-event/dist/type';

function ChatProfile() {
   const { t, i18 } = useTranslation();
   const dispatch = useDispatch();
   const chatProfileDates = useSelector(getChatProfileDates);
   const loading = useSelector(getChatProfileLoading);
   const [currentChat, setCurrentChat] = useState([]);
   const [activeChatSideBar, setActiveChatSideBar] = useState(true);
   const [resizeWidth, setResizeWidth] = useState(false);
   const respCurrentMessage = useSelector(currentMessage);
   const chatRef = useRef(null);

   useEffect(() => {
      dispatch(getChatProfileData());
   }, [dispatch]);

   const handleChangeChatItem = (el) => {
      setCurrentChat(el);
   };

   const scrollToBottom = () => {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
   };

   useEffect(() => {
      scrollToBottom();
      console.log(currentChat, 'fff');
   }, [currentChat]);

   useEffect(() => {
      setResizeWidth(window.innerWidth < 768);
      const handleResize = () => {
         setResizeWidth(window.innerWidth < 768);
      };

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);
   const chat_left_2_item_click = (el) => {
      handleChangeChatItem(el);
      setActiveChatSideBar(false);
   };

   const handleAddMessage = async (e) => {
      e.preventDefault();
      const messageText = e.target[0].value.trim();
      if (messageText !== '') {
         const messageObj = {
            museum_id: currentChat.museum_id,
            chat_id: currentChat.chat_id,
            text: messageText,
         };
         await dispatch(postMessageProfile(messageObj));

         const date = new Date();

         const year = date.getFullYear();
         const month = String(date.getMonth() + 1).padStart(2, '0');
         const day = String(date.getDate()).padStart(2, '0');
         const hours = String(date.getHours()).padStart(2, '0');
         const minutes = String(date.getMinutes()).padStart(2, '0');
         const seconds = String(date.getSeconds()).padStart(2, '0');
         const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

         setCurrentChat((prevChat) => ({
            ...prevChat,
            messages: [
               ...prevChat.messages,
               { text: messageText, type: 'visitor', created_at: formattedDate },
            ],
         }));

         await dispatch(
            setNewMessage({
               text: messageText,
               type: 'visitor',
               created_at: formattedDate,
               chatId: currentChat.chat_id,
            }),
         );

         e.target[0].value = '';
      }
   };

   if (resizeWidth) {
      return (
         <div className="chat_all">
            {activeChatSideBar ? (
               <div className="chat_left2">
                  {chatProfileDates.map((el, index) => {
                     if (el.messages && el.messages.length > 0) {
                        return (
                           <div
                              key={index}
                              className="chat_user"
                              style={{
                                 backgroundColor:
                                    el.chat_id === currentChat.chat_id
                                       ? '#EBEBEB'
                                       : el.messages?.[el.messages.length - 1]?.type === 'museum'
                                       ? '#fcebd5'
                                       : 'transparent',
                              }}
                              onClick={() => chat_left_2_item_click(el)}>
                              <p>{el.museum_name}</p>
                           </div>
                        );
                     }
                  })}
               </div>
            ) : (
               <div className="chat_right">
                  {currentChat.messages && currentChat.messages.length > 0 && (
                     <span
                        className="chat_right_back"
                        onClick={() => setActiveChatSideBar(!activeChatSideBar)}>
                        {chatLeftArrow}
                     </span>
                  )}
                  <div ref={chatRef} className="chat_right_content">
                     {loading !== 'fulfilled' ? (
                        <LoadSpinner />
                     ) : currentChat.messages && currentChat.messages.length > 0 ? (
                        currentChat.messages.map((message, index) => (
                           <div
                              key={index}
                              style={{
                                 justifyContent:
                                    message.type === 'visitor' ? 'flex-end' : 'flex-start',
                              }}
                              className="chat_right_content_full">
                              <div
                                 style={{
                                    backgroundColor:
                                       message.type === 'visitor' ? 'white' : '#3F3D56',
                                    color: message.type === 'visitor' ? 'black' : 'white',
                                 }}
                                 key={message.id}
                                 className="chat_right_content_messages">
                                 <span>{message.text}</span>
                                 <span className="chat_right_content_messages_created_at">
                                    {message.created_at.split(' ')[1].slice(0, 5)}
                                 </span>
                              </div>
                           </div>
                        ))
                     ) : chatProfileDates.every((el) => el.messages.length == 0) ? (
                        <div className="empty_messages">
                           <img
                              src={require('../../../images/message_img.png')}
                              alt="empty message"
                           />
                           <h2>{t('chat_empty_message')}</h2>
                        </div>
                     ) : (
                        <div className="empty_messages">
                           <img
                              src={require('../../../images/message_img.png')}
                              alt="empty message"
                           />
                        </div>
                     )}
                  </div>
                  {currentChat.length !== 0 && (
                     <form className="chat_right_typeing" onSubmit={handleAddMessage}>
                        <input type="text" placeholder={t('otherMessagesBot')} />
                        <label>
                           <img src={send} alt="send" />
                           <button style={{ display: 'none' }} type="submit"></button>
                        </label>
                     </form>
                  )}
               </div>
            )}

         </div>
      );
   }

   return (
      <div className="chat_all">
         <div className="chat_left">
            {chatProfileDates.map((el, index) => {
               if (el.messages && el.messages.length > 0) {
                  return (
                     <div
                        key={index}
                        className="chat_user"
                        style={{
                           backgroundColor:
                              el.chat_id === currentChat.chat_id
                                 ? '#EBEBEB'
                                 : el.messages?.[el.messages.length - 1]?.type === 'museum'
                                 ? '#fcebd5'
                                 : 'transparent',
                        }}
                        onClick={() => handleChangeChatItem(el)}>
                        <p>{el.museum_name}</p>
                     </div>
                  );
               }
            })}
         </div>

        
         <div className="chat_right">
           
            <div ref={chatRef} className="chat_right_content">
               {loading !== 'fulfilled' ? (
                  <LoadSpinner />
               ) : currentChat.messages && currentChat.messages.length > 0 ? (
                  currentChat.messages.map((message, index) => (
                     <div
                        key={index}
                        style={{
                           justifyContent: message.type === 'visitor' ? 'flex-end' : 'flex-start',
                        }}
                        className="chat_right_content_full">
                        <div
                           style={{
                              backgroundColor: message.type === 'visitor' ? 'white' : '#3F3D56',
                              color: message.type === 'visitor' ? 'black' : 'white',
                           }}
                           key={message.id}
                           className="chat_right_content_messages">
                           <span>{message.text}</span>
                           <span className="chat_right_content_messages_created_at">
                              {message.created_at.split(' ')[1].slice(0, 5)}
                           </span>
                        </div>
                     </div>
                  ))
               ) : chatProfileDates.every((el) => el.messages.length == 0) ? (
                  <div className="empty_messages">
                     <img src={require('../../../images/message_img.png')} alt="empty message" />
                     <h2>{t('chat_empty_message')}</h2>
                  </div>
               ) : (
                  <div className="empty_messages">
                     <img src={require('../../../images/message_img.png')} alt="empty message" />
                  </div>
               )}
            </div>
            {currentChat.length !== 0 && (
               <form className="chat_right_typeing" onSubmit={handleAddMessage}>
                  <input type="text" placeholder={t('otherMessagesBot')} />
                  <label>
                     <img src={send} alt="send" />
                     <button style={{ display: 'none' }} type="submit"></button>
                  </label>
               </form>
            )}
         </div>
      </div>
   );
}

export default ChatProfile;
