import React, { useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import {
   setMessagesType,
   setEducationProgramType,
} from '../../store/slices/MessagesBotSlice/MessagesBotSlice';
import { setIsOpen } from '../../store/slices/NewMessagesSlice/NewMessagesSlice';
import { CloseMessagesBtn } from '../../iconFolder/icon';

const messagesCustomStyles = {
   content: {
      top: 'auto',
      left: 'auto',
      right: '1%',
      bottom: '5px',
      // marginRight: '-50%',
      // transform: 'translate(-50%, -50%)',
      width: '350px',
      height: '567px',
      padding: '0',
      border: 'none',
      borderRadius: '10px',
      color: '#000000',
      background: 'inherit',
   },
};

const MessagesModal = ({ children }) => {
   const { modalIsOpen } = useSelector((state) => state.messages);
   // const [windowWidth, setWindowWidth] = useState(2000);
   // useEffect(() => {
   //    const handleResize = () => {
   //       setWindowWidth(window.innerWidth);
   //    };
   //    window.addEventListener('resize', handleResize);

   //    // Cleanup function to remove event listener on component unmount
   //    return () => {
   //       window.removeEventListener('resize', handleResize);
   //       dispatch(setIsOpen(false));
   //    };
   // }, []);
   //  customStyles.content.width = windowWidth > 1200 ? '40%' : windowWidth < 800 ? '80%' : '60%'

   const dispatch = useDispatch();

   const closeModal = useCallback(() => {
      dispatch(setIsOpen(false));
      dispatch(setMessagesType(null));
      dispatch(setEducationProgramType(null));
   }, []);

   useEffect(() => {
      return () => closeModal();
   }, []);

   return (
      <div>
         <Modal
            isOpen={modalIsOpen}
            // onAfterOpen={afterOpenModal}
            // onRequestClose={}
            style={{ ...messagesCustomStyles }}
            ariaHideApp={false}
            contentLabel="Example Modal">
            <div className="child_modall">
               <div onClick={closeModal} className="messagesModal-close">
                  {/* <p>X</p> */}
                  <CloseMessagesBtn width="15px" height="15px" />
               </div>
               {children}
            </div>
         </Modal>
      </div>
   );
};

export default React.memo(MessagesModal);
