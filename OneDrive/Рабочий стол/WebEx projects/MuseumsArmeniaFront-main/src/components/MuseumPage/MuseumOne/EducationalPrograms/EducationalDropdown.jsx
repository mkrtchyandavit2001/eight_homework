import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MorePlusIcons, MoreMinusIcons } from '../../../../iconFolder/icon';

const EducationalDropdown = ({ description, name, min_quantity, max_quantity, id, price }) => {
   const { t, i18n } = useTranslation();
   const [isOpen, setOpen] = useState(false);

   const handleToggle = () => {
      setOpen(!isOpen);
   };

   const contentStyle = {
      height: isOpen ? '250px' : '0',
      transition: 'height 0.5s ease-in-out, opacity 0.6s ease-in-out',
      opacity: isOpen ? 1 : 0,
      overflow: 'auto',
   };

   return (
      <div key={id} className="educationalPrograms-minBlock">
         <div className="educationalPrograms-minBlock-header">
            <p className="educationalPrograms-minBlock-header-title">{name}</p>
            <span onClick={handleToggle}>{isOpen ? <MoreMinusIcons /> : <MorePlusIcons />}</span>
         </div>
         <div className="educationalPrograms-minBlock-parDropDown" style={contentStyle}>
            <p>{description}</p>

            <p>{t(`NumberOfVisitors`)}</p>

            <p>
               {' '}
               {t(`minCount`)} : <span>{min_quantity}</span>
            </p>
            <p>
               {' '}
               {t(`maxCount`)} : <span>{max_quantity}</span>
            </p>

            <p>
               {t(`oneTicket`)} : <span>{price}֏</span>{' '}
            </p>
         </div>
      </div>
   );
};

export default memo(EducationalDropdown);
