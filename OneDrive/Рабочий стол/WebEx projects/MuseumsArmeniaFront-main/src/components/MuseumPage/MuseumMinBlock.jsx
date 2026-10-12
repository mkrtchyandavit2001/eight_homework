import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { LocationIcon } from '../../iconFolder/icon';

const MuseumMinBlock = ({ id, name, photo, region }) => {
   const { t, i18n } = useTranslation();
   return (
      <div className="par_MuseumMinBlock">
         <Link to={`museum/${id}`}>
            <div className="MuseumMinBlock">
               <div className="MuseumMinBlock-parImg">
                  <div
                     className="MuseumMinBlock_img"
                     style={{
                        backgroundImage: `url(${photo})`,
                     }}></div>
               </div>
               <div className="par_MuseumMinBlock-description">
                  <div className="block-description">
                     <h5 className="museum_name">{name}</h5>
                     <p className="museum_region">
                        <LocationIcon width={10} height={14} fill={'#575757'} />
                        {t(`${region}`)}
                     </p>
                  </div>
               </div>
            </div>
         </Link>
      </div>
   );
};

export default memo(MuseumMinBlock);
