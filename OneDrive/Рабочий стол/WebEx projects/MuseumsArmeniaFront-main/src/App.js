import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { customBasesUrlFunc } from './components/MuseumPage/customBasesUrlFunc';
import './App.css';
import HomeWraper from './page/HomeWraper';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import Newses from './components/Newses/Newses';
import SingleNews from './components/SingleNews/SingleNews';
import PrivateRouteForRegAndLog from './privateRoute/PrivateRouteForRegAndLog';
import PrivateRoute from './privateRoute/PrivateRoute';
import PrivateRouteForOutSider from './privateRoute/PrivateRouteForOutSider';
import ResetSendEmailPage from './components/ResetSendEmailPage/ResetSendEmailPage';
import ResetPasswordPage from './components/ResetPasswordPage/ResetPasswordPage';

import AbouteUsPage from './components/AbouteUsPage/AbouteUsPage';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import {
   MuseumLayouts,
   MuseumPage,
   MuseumOne,
   MuseumOneBranchOne,
   CustomNotification,
} from '../src/components/MuseumPage/index';
import SaleTicketPage from './components/SaleTicketPage/SaleTicketPage';
import Shop from './components/Shop/Shop';
import SingleShop from './components/SingleShop/SingleShop';
import FaqPage from './components/FaqPage/FaqPage';
import EventsPage from './components/EventsPage/EventsPage';
import ProfilePage from './components/ProfilePages/ProfilePage';
import MyAccount from './components/ProfilePages/MyAccount/MyAccount';
import OrderHistory from './components/ProfilePages/OrderHistory/OrderHistory';
import { useSelector } from 'react-redux';
import { getIsAuth, getIsTemp } from './store/slices/Auth/AuthSlice';
import EventSinglePage from './components/EventSinglePage/EventSinglePage';
import ComboTicket from './components/ComboTicket/ComboTicket';
import ContactWithUs from './components/contactWithUs/contactWithUs';
import ChatProfile from './components/ProfilePages/ChatProfile/ChatProfile';
import QrCode from './components/ProfilePages/QrCode/QrCode';
import Notification from './components/Notification/Notification';
import { setNotificationStatus } from './store/slices/MuseumPagesSlice/MuseumPagesSlice';
import InvalidPage from './components/InvalidPage/InvalidPage';
import { setObj } from './store/slices/BuyTicketSlice/BuyTicketSlice';
import DonationsPage from './components/ProfilePages/DonationsPage/DonationsPage';

function App() {
   const [changeFonSize, setChangeFonSize] = useState('');
   const { t, i18n } = useTranslation();
   const respTemp = useSelector(getIsTemp);
   const dispatch = useDispatch();
   const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';
   const isAuth = useSelector(getIsAuth);


   const navigate = useNavigate();

   const { pathname } = useLocation();

   useEffect(() => {
      pathname == '/' && navigate(`/${leng}/`);
      if (respTemp) {
         navigate(`/${leng}/login`);
         localStorage.removeItem('token');
         localStorage.removeItem('isAuth');
      }
   }, []);

   
   useEffect(() => {
      const params = customBasesUrlFunc();
      
      if (params?.result) {
         if (params.result === 'OK') {
            dispatch(
               setNotificationStatus({
                  species: true,
                  open: true,
                  messages: isAuth ? t(`notificationMessages.3`) : t(`notificationMessages.0`),
               })
            );
         } else {
            setTimeout(() => {
               dispatch(
                  setNotificationStatus({
                     species: false,
                     open: true,
                     messages: t(`notificationMessages.1`),
                  })
               );
            }, 2000);
         }
      }
   }, [isAuth]);

   const changeFont = (type) => {
      setChangeFonSize(type);
   };


   useEffect(() => {
      const handlePageShow = (event) => {
        if (event.persisted || window.performance.navigation.type === 2) {
          window.location.reload();
          console.log('page reload');
          
        }
      };
  
      window.addEventListener('pageshow', handlePageShow);
  
      return () => {
        window.removeEventListener('pageshow', handlePageShow);
      };
    }, []);


   return (
      <div className={`App  ${changeFonSize}`}>
         <Routes>
            <Route path="/" element={<HomeWraper {...{ changeFonSize, changeFont }} />}>
               <Route path=":leng">
                  <Route
                     path="login"
                     element={
                        <PrivateRouteForRegAndLog>
                           <LoginPage />
                        </PrivateRouteForRegAndLog>
                     }
                  />
                  <Route
                     path="register"
                     element={
                        <PrivateRouteForRegAndLog>
                           <RegisterPage />
                        </PrivateRouteForRegAndLog>
                     }
                  />
                  <Route
                     path="reset-password-send-email"
                     element={
                        <PrivateRouteForRegAndLog>
                           <ResetSendEmailPage />
                        </PrivateRouteForRegAndLog>
                     }
                  />
                  <Route
                     path="reset-password"
                     element={
                        <PrivateRouteForRegAndLog>
                           <ResetPasswordPage />
                        </PrivateRouteForRegAndLog>
                     }
                  />

                  <Route
                     index
                     element={
                        <PrivateRouteForOutSider>
                           <HomePage {...{ changeFonSize, changeFont }} />
                        </PrivateRouteForOutSider>
                     }
                  />
                  <Route
                     path="museums"
                     element={
                        <PrivateRouteForOutSider>
                           <MuseumLayouts />
                        </PrivateRouteForOutSider>
                     }>
                     <Route
                        index
                        element={
                           <PrivateRouteForOutSider>
                              <MuseumPage />
                           </PrivateRouteForOutSider>
                        }
                     />
                     <Route
                        path="museum/:id"
                        element={
                           <PrivateRouteForOutSider>
                              <MuseumOne />
                           </PrivateRouteForOutSider>
                        }
                     />
                     <Route
                        path="museum/:id/branch/:branchId"
                        element={
                           <PrivateRouteForOutSider>
                              <MuseumOneBranchOne />
                           </PrivateRouteForOutSider>
                        }
                     />
                  </Route>

                  <Route
                     path="news"
                     element={
                        <PrivateRouteForOutSider>
                           <Newses {...{ changeFonSize }} />
                        </PrivateRouteForOutSider>
                     }
                  />
                  <Route
                     path="news/:id"
                     element={
                        <PrivateRouteForOutSider>
                           <SingleNews />
                        </PrivateRouteForOutSider>
                     }
                  />
                  <Route path="privacy-policy" element={<PrivacyPolicy />} />
                   {/* <Route
                     path="store"
                     element={
                        <PrivateRouteForOutSider>
                           <Shop />
                        </PrivateRouteForOutSider>
                     }
                  /> */}
                  <Route path="store" element={<div style={{ height: '100vh', display:'flex', justifyContent: 'center', paddingTop: '120px'}}><h3 style={{textAlign: 'center', fontSize: '30px', color: 'var(--second_font_color)'}}>{t('storeErrorPage')}</h3></div>} />
                  <Route 
                     path="store/:id"
                     element={
                        <PrivateRouteForOutSider>
                           <SingleShop />
                        </PrivateRouteForOutSider>
                     }
                  />
                  <Route
                     path="aboute-us"
                     element={
                        <PrivateRouteForOutSider>
                           <AbouteUsPage />
                        </PrivateRouteForOutSider>
                     }
                  />
                  <Route
                     path="ticket-sale"
                     element={
                        <PrivateRouteForOutSider>
                           <SaleTicketPage />
                        </PrivateRouteForOutSider>
                     }
                  />

                  <Route
                     path="FAQ"
                     element={
                        <PrivateRouteForOutSider>
                           <FaqPage />
                        </PrivateRouteForOutSider>
                     }
                  />
                  <Route path="events">
                     <Route
                        index
                        element={
                           <PrivateRouteForOutSider>
                              <EventsPage />
                           </PrivateRouteForOutSider>
                        }
                     />
                     <Route
                        path=":id"
                        element={
                           <PrivateRouteForOutSider>
                              <EventSinglePage />
                           </PrivateRouteForOutSider>
                        }
                     />
                  </Route>

                  <Route
                     path="profilePage"
                     element={
                        <PrivateRoute>
                           <ProfilePage />
                        </PrivateRoute>
                     }>
                     <Route
                        index
                        element={
                           <PrivateRoute>
                              <MyAccount />
                           </PrivateRoute>
                        }
                     />
                     <Route
                        path="myaccount"
                        element={
                           <PrivateRoute>
                              <MyAccount />
                           </PrivateRoute>
                        }
                     />
                     <Route
                        path="chat"
                        element={
                           <PrivateRoute>
                              <ChatProfile />
                           </PrivateRoute>
                        }
                     />
                     <Route
                        path="orderhistory"
                        element={
                           <PrivateRoute>
                              <OrderHistory />
                           </PrivateRoute>
                        }
                     />
                     <Route
                        path="qrcode"
                        element={
                           <PrivateRoute>
                              <QrCode />
                           </PrivateRoute>
                        }
                     />

                     <Route
                        path="notification"
                        element={
                           <PrivateRoute>
                              <Notification />
                           </PrivateRoute>
                        }
                     />

                     <Route
                        path="donations"
                        element={
                           <PrivateRoute>
                              <DonationsPage/>
                           </PrivateRoute>
                        }
                     />
                  </Route>

                  <Route
                     path="comboticket"
                     element={
                        <PrivateRouteForOutSider>
                           <ComboTicket />
                        </PrivateRouteForOutSider>
                     }
                  />

                  <Route
                     path="contact"
                     element={
                        <PrivateRouteForOutSider>
                           <ContactWithUs />
                        </PrivateRouteForOutSider>
                     }
                  />
               </Route>
            </Route>

            <Route path="*" element={<InvalidPage />} />
         </Routes>
         <CustomNotification />
      </div>
   );
}

export default App;
