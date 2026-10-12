import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotificationStatus } from '../../store/slices/MuseumPagesSlice/MuseumPagesSlice';
import { CrossIcon, CheckMarkIcon, dawnloadIcon } from '../../iconFolder/icon';
import { useTranslation } from 'react-i18next';
import { customBasesUrlFunc } from './customBasesUrlFunc';

const CustomNotification = () => {
   const { notificationStatus } = useSelector((state) => state.museumPages);
   const dispatch = useDispatch();
   const { t } = useTranslation();
   const notificationStatusRef = React.useRef(notificationStatus);
   const params = customBasesUrlFunc();
   const [iactiveModal, setIactiveModal] = React.useState(true);
   
   React.useEffect(() => {
      notificationStatusRef.current = notificationStatus;
   }, [notificationStatus]);

   React.useEffect(() => {
      const timeoutId = setTimeout(() => {
         dispatch(
            setNotificationStatus({
               open: false,
               species: notificationStatusRef.current?.species,
               messages: notificationStatusRef.current?.messages,
            })
         );
      }, 8000);
      return () => clearTimeout(timeoutId);
   }, [dispatch]);

   const handleClose = () => {
      dispatch(
         setNotificationStatus({
            open: false,
            species: notificationStatus?.species,
            messages: notificationStatus?.messages,
         })
      );
   };

   

   return (
      <>
         {(!notificationStatus?.species )&& (
            <div
               className="CustomNotification-par"
               style={{
                  opacity: notificationStatus?.open ? '1' : '0',
                  transform: notificationStatus?.open ? 'translateX(-14px)' : 'translateX(400px)',
               }}>
               <div
                  style={{ backgroundColor: '#ED5756' }}
                  className="CustomNotification-block_left"></div>
               <div className="CustomNotification-block_right">
                  <button onClick={handleClose} style={{ background: 'none', border: 'none' }}>
                     <CrossIcon />
                  </button>
                  <p>{notificationStatus?.messages}</p>
               </div>
            </div>
         )}

         {iactiveModal && notificationStatus?.species === true && (
            <div className="notification_modal_request">
               <div className="notification_modal_requests_block">
                  <p style={{textAlign: 'center'}}>{notificationStatus?.messages}</p>
                  { params?.pdf && params?.pdf != 'null' && <div className="notification_modal_request_block_icons">
                     <p>{t('notificationMessages.2')}</p>
                     <a href={params?.pdf} download target="_blank">{dawnloadIcon}</a>
                  </div>}
               <span className="notification_modal_request_close" onClick={() => setIactiveModal(false)}>X</span>
               </div>
            </div>
         )}
      </>
   );
};

export default React.memo(CustomNotification);
