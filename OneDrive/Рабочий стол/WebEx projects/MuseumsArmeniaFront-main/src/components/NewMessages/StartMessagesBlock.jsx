import React from 'react';
import { useTranslation } from 'react-i18next';

import { StartMessagesIcon } from '../../iconFolder/icon';
const StartMessagesBlock = ({ onClick, txt }) => {
   const { t, i18n } = useTranslation();
   return (
      <div className="StartMessagesBlock">
         <div className="StartMessagesBlock-child">
            <div className="Startmessages-iconBlock">
               <StartMessagesIcon width="160px" height="140px" />
            </div>
            <div className="Startmessages-textBlock">
               <p>{t(`${txt}`)}</p>
            </div>

            <button onClick={onClick} className="Startmessages-Button">
               {t(`buttons.8`)}
            </button>
         </div>
      </div>
   );
};

export default React.memo(StartMessagesBlock);
