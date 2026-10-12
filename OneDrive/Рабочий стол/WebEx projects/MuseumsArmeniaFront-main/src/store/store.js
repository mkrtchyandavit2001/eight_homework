import { configureStore } from '@reduxjs/toolkit';
import { loginReducer } from './slices/LoginSlice/LoginSlice';
import { registerReducer } from './slices/RegisterSlice/RegisterSlice';
import { verifyAccountReducer } from './slices/VerifyAccountSlice/VerifyAccountSlice';
import { authReduser } from './slices/Auth/AuthSlice';
import { repeatVerifyCodeReducer } from './slices/RepeatVerifyCodeSlice/RepeatVerifyCodeSlice';
import { logOutReducer } from './slices/LogOutSlice/LogOutSlice';
import { googleLoginReducer } from './slices/GoogleLoginSlice/GoogleLoginSlice';
import { ResetPasswordWithEmailReducer } from './slices/ResetPasswordWithEmailSlice/ResetPasswordWithEmailSlice';
import { checkForgotTokenReducer } from './slices/CheckForgotTokenSlice/CheckForgotTokenSlice';
import { newPasswordReducer } from './slices/NewPasswordeSlise/NewPasswordeSlise';
import { resendForgotReducer } from './slices/ResendForgotSlice/ResendForgotSlice';
import { MuseumPagesReducer } from './slices/MuseumPagesSlice/MuseumPagesSlice';
import { NewsesReducer } from './slices/newses/NewsesSlice';
import { ShopReducer } from './slices/Shop/ShopSlice';
import { NewMessagesReducer } from './slices/NewMessagesSlice/NewMessagesSlice';
import { bannerReducer } from './slices/BanerSlice/BanerSlice';
import { souvinersProdReducer } from './slices/SouvinersProdSlice/SouvinersProdSlice';
import { MessagesBot } from './slices/MessagesBotSlice/MessagesBotSlice';
import { privateTicketReducer } from './slices/PrivateTicketSlice/PrivateTicketSlice';
import { eventsTicketReducer } from './slices/PrivateEventTicketSlice/PrivateEventTicketSlice';
import { eventPageReducer } from './slices/EventsPageSlice/EventsPageSlice';
import { buyTicketReducer } from './slices/BuyTicketSlice/BuyTicketSlice';
import { MuseumTicketReducer } from './slices/MuseumTicket/MuseumTicketSlice';
import { ContactUsReducer } from './slices/ContactUs/ContactUsSlice';
import { singleEventReducer } from './slices/SingleEventSlice/SingleEventSlice';
import { ComboTicketsReducer } from './slices/ComboTicket/ComboTicketSlice';
import { ChatProfileReducer } from './slices/ChatProfile/ChatProfileSlice';
import { profilePageReducer } from './slices/ProfilePageSlice/ProfilePageSlice';
import { donationReducer } from './slices/DonationSlice/DonationSlice';


const store = configureStore({
   reducer: {
      login: loginReducer,
      register: registerReducer,
      verifyAccount: verifyAccountReducer,
      auth: authReduser,
      resendVerify: repeatVerifyCodeReducer,
      logOut: logOutReducer,
      googleLogin: googleLoginReducer,
      resetWithEmail: ResetPasswordWithEmailReducer,
      checkForgotToken: checkForgotTokenReducer,
      newPassword: newPasswordReducer,
      resendForgot: resendForgotReducer,
      museumPages: MuseumPagesReducer,
      messages: NewMessagesReducer,
      banner: bannerReducer,
      souvinersProd: souvinersProdReducer,
      newses: NewsesReducer,
      shop: ShopReducer,
      messagesBot: MessagesBot,
      privateTicket: privateTicketReducer,
      eventsTicket: eventsTicketReducer,
      eventPage:eventPageReducer,
      buyTicket: buyTicketReducer,
      museumTicket: MuseumTicketReducer,
      contactus:ContactUsReducer,
      combotickets:ComboTicketsReducer,
      chatprofile:ChatProfileReducer,
      singleEvent: singleEventReducer,
      profilePage: profilePageReducer,
      donation: donationReducer
   },
   // middleware: (getDefaultMiddlware)=>[
   //     ...getDefaultMiddlware(),

   // ]
});

export default store;
