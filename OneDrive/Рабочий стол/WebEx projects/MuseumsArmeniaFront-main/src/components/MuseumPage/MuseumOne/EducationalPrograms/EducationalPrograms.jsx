import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import EducationalDropdown from './EducationalDropdown';
import { useDispatch } from 'react-redux';
import { setIsOpen } from '../../../../store/slices/NewMessagesSlice/NewMessagesSlice';

const EducationalPrograms = ({ dataEducationalPrograms }) => {
   const { t, i18n } = useTranslation();
   const dispatch = useDispatch();

   const openModal = useCallback(() => {
      dispatch(setIsOpen(true));
   }, []);

   return (
      <div className="museumOne_pageStyle">
         <div className="educationalPrograms-par">
            <h4 className="museumOne_title">{t(`educationalPrograms`)}</h4>
            <p className="educationalPrograms-par-txt">{t(`educationTitle.0`)}<span className='educationalPrograms-par-button' onClick={openModal}>{t(`educationTitle.1`)}</span> {t(`educationTitle.2`)}</p>
            <div className="museumOne_pageStyle-parentMinBlock">
               {dataEducationalPrograms.map((el) => (
                  <EducationalDropdown key={el.id} {...el} />
               ))}
            </div>
         </div>
      </div>
   );
};

export default memo(EducationalPrograms);
