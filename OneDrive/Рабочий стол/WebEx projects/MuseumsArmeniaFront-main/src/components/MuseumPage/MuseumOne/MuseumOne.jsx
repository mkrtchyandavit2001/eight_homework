import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
   postMuseumOnePages,
   educationalPrograms,
   getMuseumOneEvents,
   getMuseumOneProducts,
   getOtherServices,
} from '../../../store/slices/MuseumPagesSlice/MuseumPagesApi';
import { getAuthUserAllMessages } from '../../../store/slices/NewMessagesSlice/NewMessagesSliceApi';
import { useTranslation } from 'react-i18next';
import {
   setModalTicketIsOpen,
   setTicketType,
} from '../../../store/slices/MuseumTicket/MuseumTicketSlice';
import {
   MuseumOneDescription,
   OurEvents,
   MuseumOnecontact,
   EducationalPrograms,
   MuseumOneShop,
   MuseumOneVirtualTour,
   MuseumOneBranch,
   IsWrong,
} from '../index';
import LoadSpinner from '../../LoadSpinner/LoadSpinner';
import MuseumPageHeader from '../MuseumPageHeader';
import MuseumPageMessages from '../../NewMessages/MuseumPageMessages';
import CustomButtonBlock from './CustomButtonBlock';
import { MuseumAbonementIcons } from '../../../iconFolder/icon';
import { TicketMuseumBlock } from './Ticket';
import OutSideErrorModal from '../../OutSideErrorModal/OutSideErrorModal';
import { selectOtherServices } from '../../../store/slices/MuseumPagesSlice/MuseumPagesSlice';
import Donation from './Donation/Donation';
import { setIsOpen } from '../../../store/slices/NewMessagesSlice/NewMessagesSlice';
import { getPrivateTicket } from '../../../store/slices/PrivateTicketSlice/PrivateTicketApi';

const MuseumOne = () => {
   const { t } = useTranslation();
   const { id } = useParams();
   const dispatch = useDispatch();
   const [openAboniment, setOpenAboniment] = useState(null);
   const { isAuth } = useSelector((store) => store.auth);
   const { statusInfoModal, ticketType } = useSelector((state) => state.museumTicket);
   const otherServices = useSelector(selectOtherServices);

   const {
      loadingdataMuseumOne,
      dataMuseumOne,
      dataEducationalPrograms,
      educationalProgramsLoad,
      loadingMuseumOneEvents,
      dataMuseumOneEvents,
   } = useSelector((state) => state.museumPages);

   useEffect(() => {
      dispatch(postMuseumOnePages({ id }));
      dispatch(educationalPrograms({ id }));
      dispatch(getMuseumOneEvents({ id }));
      dispatch(getMuseumOneProducts({ museumId: id }));
      dispatch(getOtherServices(id));
      dispatch(getPrivateTicket({ type: 'special', museum_id: id }));
      if (isAuth) {
         dispatch(getAuthUserAllMessages(id));
      }
   }, [id, isAuth, dispatch]);

   const openModal = useCallback(() => {
      dispatch(setIsOpen(true));
   }, [dispatch]);

   const handleClickTicket = useCallback(
      (kindOf, type) => {
         dispatch(setModalTicketIsOpen(true));
         dispatch(setTicketType({ kindOf, type, ticketType: '' }));
      },
      [dispatch],
   );

   useEffect(() => {
      if (Array.isArray(dataMuseumOne?.tickets)) {
         setOpenAboniment(
            dataMuseumOne.tickets.find((el) => el?.type?.includes('subscription')) || null,
         );
      } else {
         setOpenAboniment(null);
      }
   }, [dataMuseumOne]);

   return (
      <>
         {statusInfoModal.status && <OutSideErrorModal txt={statusInfoModal.text} />}
         {loadingdataMuseumOne === 'loading' ? (
            <LoadSpinner />
         ) : loadingdataMuseumOne === 'fulfilled' ? (
            <div>
               <MuseumPageHeader headerImg={dataMuseumOne.main_photo} title={dataMuseumOne.name} />
               <div className="museumPage_sectionOne">
                  <div
                     className="container"
                     style={{
                        backgroundColor: '#ffffff',
                     }}>
                     <div className="museumOne_parent">
                        <div className="museumOne_parent-section1">
                           <div className="museumOne-blockLeft">
                              <MuseumOneDescription
                                 description={dataMuseumOne.description}
                                 photos={dataMuseumOne.photos}
                                 handleClickTicket={handleClickTicket}
                                 openBtn={true}
                                 ticketType={ticketType}
                                 oneMuseum={dataMuseumOne}
                              />
                           </div>
                           <div className="museumOne-blockRigth ">
                              <MuseumOnecontact {...dataMuseumOne} />
                              {openAboniment && (
                                 <CustomButtonBlock
                                    icon={<MuseumAbonementIcons />}
                                    title={'webSideMusum.2'}
                                    text={'ButtonBlock.0'}
                                    background={
                                       ticketType.type === 'Abonement ticket'
                                          ? '#3F3D56'
                                          : '#D5AA72'
                                    }
                                    color={'#FFFFFF'}
                                    onClick={() => handleClickTicket('ticket', 'Abonement ticket')}
                                    newClass="newStyleBtn"
                                 />
                              )}

                              <CustomButtonBlock
                                 icon={<MuseumAbonementIcons />}
                                 title={'haveQuestions'}
                                 text={'ButtonBlock.1'}
                                 background={'#3F3D56'}
                                 color={'#FFFFFF'}
                                 boxShadow={'none'}
                                 textBtn="11"
                                 onClick={openModal}
                                 newClass="newStyleBtn"
                              />

                              <Donation />
                           </div>
                        </div>

                        {loadingMuseumOneEvents === 'fulfilled' &&
                           dataMuseumOneEvents.length > 0 && (
                              <OurEvents {...{ dataMuseumOneEvents }} />
                           )}

                        {educationalProgramsLoad === 'fulfilled' &&
                           dataEducationalPrograms.length > 0 && (
                              <EducationalPrograms
                                 dataEducationalPrograms={dataEducationalPrograms}
                              />
                           )}

                        {otherServices?.data?.length > 0 && (
                           <div className="museum_otherservices">
                              <div className="museum_otherservices_header">
                                 <h4 className="museum_otherservices_title">{t('otherServices')}</h4>
                                 <p className="museum_otherservices_sub_title">
                                    {t('otherServicesSubTitle')}
                                 </p>
                              </div>

                              <div className="otherServices_items">
                                 {otherServices.data.map((item, index) => (
                                    <div className="otherServices_item" key={item.id ?? index}>
                                       <p>{index + 1}</p>
                                       <div className="oneService">
                                          <p className="oneService_name" title={item.name}>
                                             {item.name}
                                          </p>
                                          <p className="oneService_price">{item.price} AMD</p>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        )}

                        {/* <MuseumOneShop dataMuseumProducts={dataMuseumProducts} museumId={id} /> */}

                        {dataMuseumOne.links?.virtual_tour && (
                           <MuseumOneVirtualTour virtual_tour={dataMuseumOne.links.virtual_tour} />
                        )}

                        {dataMuseumOne?.branches?.length > 0 && (
                           <MuseumOneBranch branches={dataMuseumOne.branches} />
                        )}
                     </div>

                     <TicketMuseumBlock />
                     <MuseumPageMessages museumId={id} />
                  </div>
               </div>
            </div>
         ) : (
            <IsWrong text={t(`isWrong.0`)} />
         )}
      </>
   );
};

export default React.memo(MuseumOne);