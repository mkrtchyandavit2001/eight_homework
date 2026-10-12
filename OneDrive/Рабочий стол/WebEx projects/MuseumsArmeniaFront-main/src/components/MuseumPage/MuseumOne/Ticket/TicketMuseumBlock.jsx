import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
   setModalTicketIsOpen,
   setResetDataItems,
} from '../../../../store/slices/MuseumTicket/MuseumTicketSlice';
import { setNotificationStatus } from '../../../../store/slices/MuseumPagesSlice/MuseumPagesSlice';

import { MuseumTicketModal, TicketMuseumCatalog, TicketMuseumForm } from './index';

import './TicketMuseumBlock.css';

const TicketMuseumBlock = () => {
   const dispatch = useDispatch();
   const { modalTicketIsOpen, ticketType, success, paymentsUrl, ticketLoading, responseMessages } =
      useSelector((state) => state.museumTicket);

   const handleClickCloseModal = useCallback(() => {
      dispatch(setModalTicketIsOpen(false));
      dispatch(setResetDataItems());
   }, [dispatch]);

   // Վճարման էջ անցում
   useEffect(() => {
      if (success && paymentsUrl) {
         window.location.assign(`${paymentsUrl}`);
      }
   }, [success, paymentsUrl]);

   // Մաքրում՝ միայն unmount-ի ժամանակ
   useEffect(() => {
      return () => handleClickCloseModal();
   }, [handleClickCloseModal]);

   // Գնելու սխալի notification (աշխատում է և՛ կատալոգի, և՛ ձևի դեպքում)
   useEffect(() => {
      if (ticketLoading === 'rejected' && responseMessages) {
         dispatch(
            setNotificationStatus({
               species: false,
               open: true,
               messages: responseMessages,
            }),
         );
         const timerId = setTimeout(() => {
            dispatch(
               setNotificationStatus({ species: false, open: false, messages: responseMessages }),
            );
         }, 8000);
         return () => clearTimeout(timerId);
      }
   }, [ticketLoading, responseMessages, dispatch]);

   return (
      <MuseumTicketModal
         modalIsOpen={modalTicketIsOpen}
         handleClickCloseModal={handleClickCloseModal}>
         {ticketType.kindOf === 'ticket' ? <TicketMuseumCatalog /> : <TicketMuseumForm />}
      </MuseumTicketModal>
   );
};

export default React.memo(TicketMuseumBlock);