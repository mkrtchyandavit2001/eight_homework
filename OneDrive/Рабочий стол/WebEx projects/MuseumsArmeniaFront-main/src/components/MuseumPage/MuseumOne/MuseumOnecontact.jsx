import React from 'react';
import { useTranslation } from 'react-i18next';
import {
   LocationIcon,
   PhoneIcons,
   WebSideIcons,
   InvateIcons,
   InstaIcons,
   EmailIcons,
   FbIcon,
} from '../../../iconFolder/icon';
import { NavLink } from 'react-router-dom';
const MuseumOnecontact = ({
   working_days = '',
   region = '',
   director = '',
   address = '',
   phones = [],
   links = {},
   email = '',
}) => {
   const { t, i18n } = useTranslation();
   const [copySuccess, setCopySuccess] = React.useState(false);
   const getBaseUrl = React.useCallback((url) => {
      const regex = /^(?:([^\:]+)\:\/\/)?([^\/]+)/;
      const match = url.match(regex);
      return match?.[2];
   }, []);

   const copyToClipboard = React.useCallback(() => {
      if (navigator?.clipboard?.writeText) {
         navigator.clipboard.writeText(window.location.href);
         console.log(' test Clipboard live variant 1');
      } else {
         console.log('test Clipboard live variant 2');
         const el = document.createElement('textarea');
         el.value = window.location.href;
         document.body.appendChild(el);
         el.select();
         document.execCommand('copy');
         document.body.removeChild(el);
      }

      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
   }, []);

   return (
      <div className="museumOne_pageStyle blockRigth_styles">
         {working_days && (
            <div>
               <h4>{t(`working_hours`)}</h4>
               <p className="par-contactMinBlock">{working_days}</p>
            </div>
         )}
         {address && (
            <div>
               <h4>{t(`our_address`)}</h4>
               <p className="par-contactMinBlock">
                  <LocationIcon width={20} height={20} fill="#3F3D56" />
                  {region && `${t(`${region}`)}, `}
                  {address && address}
               </p>
            </div>
         )}


         {email && (
            <div>
               <div className="blockRigth_styles-parPhone">
                  <EmailIcons />
                  <p>
                     <NavLink to={`mailto:${email}`} rel="noopener noreferrer" target="_blank">
                        {email}
                     </NavLink>
                  </p>
               </div>
            </div>
         )}

         {director && (
            <div>
               <h4>{t(`director`)}</h4>
               <p className="par-contactMinBlock">{director}</p>
            </div>
         )}
         {links?.web_site && (
            <div>
               <h4>{t(`webSideMusum.0`)}</h4>
               <div className="blockRigth_styles-parPhone">
                  <WebSideIcons width={17} />
                  <p className="par-contactMinBlock">
                     <a href={links?.web_site} rel="noopener noreferrer" target="_blank">
                        {getBaseUrl(links?.web_site)}
                     </a>
                  </p>
               </div>
            </div>
         )}
         {phones.length > 0 && (
            <div>
               <div className="blockRigth_styles-parPhone">
                  <PhoneIcons width={22} height={22} />
                  {phones?.map((el, idx) => (
                     <p key={idx} className="par-contactMinBlock">
                        <a href={`tel:${el}`}>{el},</a>
                     </p>
                  ))}
               </div>
            </div>
         )}
         <div>
            <div
               style={{ cursor: 'pointer' }}
               onClick={copyToClipboard}
               className="blockRigth_styles-parPhone Invate_par">
               <InvateIcons width={22} />
               <p>{t(`webSideMusum.1`)}</p>
               <div
                  className="Invate_child"
                  style={{
                     opacity: copySuccess ? '1' : '0',
                     transform: copySuccess ? 'translateX(35px)' : 'translateX(370px)',
                  }}>
                  <p>{t(`webSideMusum.3`)}</p>
               </div>
            </div>
         </div>
         {links?.facebook && (
            <div>
               <div className="blockRigth_styles-parPhone">
                  <FbIcon />
                  <p>
                     <a href={links?.facebook} rel="noopener noreferrer" target="_blank">
                        Facebook
                     </a>
                  </p>
               </div>
            </div>
         )}
         {links?.instagram && (
            <div>
               <div className="blockRigth_styles-parPhone">
                  <InstaIcons />
                  <p>
                     <a href={links?.instagram} rel="noopener noreferrer" target="_blank">
                        Instagram
                     </a>
                  </p>
               </div>
            </div>
         )}
      </div>
   );
};

export default React.memo(MuseumOnecontact);
