import React from 'react';
import { useTranslation } from 'react-i18next';

const MuseumOneVirtualTour = ({ virtual_tour }) => {
   const [t, i18n] = useTranslation();
   return (
      <div className="museumOne_pageStyle">
         <div className="educationalPrograms-par">
            <h4 className="museumOne_title">{t(`virtualExcursion`)}</h4>

            <div className="museumOneVirtualTour-iframePar">
               <iframe
                  src={virtual_tour}
                  style={{ height: '100%', width: '100%' }}
                  title="Iframe Example"
                  allow="xr-spatial-tracking; vr; fullscreen"></iframe>
            </div>
         </div>
      </div>
   );
};

export default React.memo(MuseumOneVirtualTour);
