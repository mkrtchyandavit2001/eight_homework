import React, { useRef, useEffect, memo } from 'react';

const UserChatList = ({ messagesUser, dataMuseumMessages }) => {
   const divRef = useRef();

   useEffect(() => {
      const div = divRef.current;
      div.scrollTop = div.scrollHeight;
   }, [dataMuseumMessages, messagesUser]);

   return (
      <div ref={divRef} className="par_type">
         {/* <div className="par-avatar_bot">
            <div
               className="avatar_bot"
               style={{ background: `url(${dataMuseumOne.main_photo})` }}></div>
            <p>{dataMuseumOne.name}</p>
         </div> */}
         <div className="chatList-bot">
            <ul className="chatList-ul">
               {dataMuseumMessages.messages.map((el) => (
                  <li
                     key={el.id}
                     className={el.type === 'visitor' ? 'user_messages' : 'admin_messages'}>
                     <span style={{ cursor: 'inherit' }}>{el.text}</span>
                  </li>
               ))}
               {messagesUser.map((el, idx) => (
                  <li key={idx} className={'user_messages'}>
                     <span style={{ cursor: 'inherit' }}>{el}</span>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
};

export default memo(UserChatList);
