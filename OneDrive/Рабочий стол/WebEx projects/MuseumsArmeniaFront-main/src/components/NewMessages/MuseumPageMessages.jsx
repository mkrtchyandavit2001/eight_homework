import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import MessagesModal from './MessagesModal';
import MessagesBlock from './MessagesBlock';
import NotUserMessagesBlock from './NotUserMessagesBlock';

import './newMesages.css';

const MuseumPageMessages = () => {
   const { isAuth, authUser } = useSelector((store) => store.auth);
   const { dataMuseumMessages } = useSelector((store) => store.messages);

   return (
      <div className="bigPar-MessagesModal">
         <MessagesModal>
            <>
               <div className="MessagesModal-header"></div>
               <div className="MessagesModal-section">
                  {isAuth ? (
                     <MessagesBlock authUser={authUser} dataMuseumMessages={dataMuseumMessages} />
                  ) : (
                     <NotUserMessagesBlock />
                  )}
               </div>
            </>
         </MessagesModal>
      </div>
   );
};

export default memo(MuseumPageMessages);
