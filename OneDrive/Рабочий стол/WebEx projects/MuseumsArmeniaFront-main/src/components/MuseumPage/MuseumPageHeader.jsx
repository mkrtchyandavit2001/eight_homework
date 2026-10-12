import React, { memo } from 'react';


import './museumPage.css';

const MuseumPageHeader = ({headerImg = '', title= ''}) => {
   return (
      <div className="museumPageHeader">
         <div
            className="parHeader_img"
            style={{
               top: '0',
            }}>
            <img
               src={headerImg}
               alt=""
               style={{
                  width: '100%',
               }}
            />
         </div>
         <div className="par_pageHeader-txt">
            <div className="par_txt">
               <h1>{title}</h1>
            </div>
         </div>
      </div>
   );
};

export default memo(MuseumPageHeader);
