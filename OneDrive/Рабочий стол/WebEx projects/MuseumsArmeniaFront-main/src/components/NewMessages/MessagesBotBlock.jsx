import React, { useCallback, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
   setMessagesType,
   setEducationProgramType,
} from '../../store/slices/MessagesBotSlice/MessagesBotSlice';

const dataTypeMessages = ['educational_program', 'excursion', 'other'];
const chatBotHint = [...new Array(7)];

const MessagesBotBlock = ({ messagesUser, resetMessages }) => {
   const { t, i18n } = useTranslation();

   const dispatch = useDispatch();
   const { dataEducationalPrograms } = useSelector((store) => store.museumPages);
   const { messagesType, educationProgramType } = useSelector((store) => store.messagesBot);

   const onClickMessagesType = useCallback((item) => {
      dispatch(setMessagesType(item));
      dispatch(setEducationProgramType(null));
      resetMessages();
   }, []);
   const onClickEducationProgramType = useCallback((item) => {
      dispatch(setEducationProgramType(item));
      resetMessages();
   }, []);

   const divRef = useRef();

   useEffect(() => {
      const div = divRef.current;
      div.scrollTop = div.scrollHeight;
   }, [messagesType, educationProgramType, messagesUser]);

   return (
      <>
         <div ref={divRef} className="par_type">
            {/* <div className="par-avatar_bot">
               <div
                  className="avatar_bot"
                  style={{ background: `url(${dataMuseumOne.main_photo})` }}></div>
               <p>{dataMuseumOne.name}</p>
            </div> */}

            <ul className="chatList-ul">
               <li className="admin_messages">
                  <span style={{ cursor: 'inherit' }} className="">
                     {t(`typeMessages`)}
                  </span>
                  {dataTypeMessages.map((item, idx) => (
                     <span
                        onClick={() => onClickMessagesType(item)}
                        key={idx}
                        style={{
                           display:
                              item === 'educational_program' && !dataEducationalPrograms.length
                                 ? 'none'
                                 : '',
                        }}
                        className="">
                        - {t(`${item}`)}
                     </span>
                  ))}
               </li>

               {messagesType && (
                  <li className="user_messages">
                     <span className="">{t(`${messagesType}`)}</span>
                  </li>
               )}

               {messagesType === 'educational_program' ? (
                  <li className="admin_messages">
                     {dataEducationalPrograms.map((el, idx) => (
                        <span key={el.id} onClick={() => onClickEducationProgramType(el.name)}>
                           {idx + 1}.{el.name}
                        </span>
                     ))}
                  </li>
               ) : (
                  ''
               )}
               {educationProgramType ? (
                  <li className="user_messages">
                     <span className="">{educationProgramType}</span>
                  </li>
               ) : (
                  ''
               )}
               {dataEducationalPrograms.length && messagesType === 'educational_program' ? (
                  educationProgramType ? (
                     <li className="admin_messages">
                        <ul className="chatBotHint_list">
                           {chatBotHint.map((_, idx) => (
                              <li key={idx}>
                                 {idx !== 6
                                    ? `${idx > 0 ? `${idx}.` : ''} ${t(`chatBotHint.${idx}`)}`
                                    : ''}
                              </li>
                           ))}
                        </ul>
                     </li>
                  ) : (
                     ''
                  )
               ) : messagesType === 'excursion' ? (
                  <li className="admin_messages">
                     <ul className="chatBotHint_list">
                        {chatBotHint.map((_, idx) => (
                           <li key={idx}>
                              {idx > 0 ? `${idx}.` : ''}
                              {t(`chatBotHint.${idx}`)}
                           </li>
                        ))}
                     </ul>
                  </li>
               ) : messagesType === 'other' ? (
                  <li className="admin_messages">
                     <span className="">{t(`otherMessagesBot`)}</span>
                  </li>
               ) : (
                  ''
               )}

               {messagesUser.length
                  ? messagesUser.map((el, idx) => (
                       <li key={idx} className="user_messages">
                          <span className="">{el}</span>
                       </li>
                    ))
                  : ''}
            </ul>
         </div>
      </>
   );
};

export default React.memo(MessagesBotBlock);
