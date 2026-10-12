import React, {memo} from 'react';
import ButtonSecond from '../../ButtonSecond/ButtonSecond';
import { useTranslation } from 'react-i18next';
const CustomButtonBlock = ({ icon='', background='', color='', boxShadow='', title='', text='',textBtn='', onClick = () => {}, newClass='' }) => {
   const { t, i18n } = useTranslation();
   
   return (
      <div className="museumOne_pageStyle blockRigth_styles">
         <div className="header_right-button">
         {icon}
         <h4>{t(`${title}`)}</h4>
         </div>
         <p>{t(`${text}`)}</p>
         <div
            onClick={onClick}
            style={{
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
            }}>
           {textBtn && <ButtonSecond txt={textBtn} minWidth="210px" background={background} color={color} boxShadow={boxShadow} newClass={newClass}/>}
           {/* <ButtonSecond txt={textBtn} minWidth="210px" background={background} color={color} boxShadow={boxShadow} newClass={newClass}/> */}
         </div>
      </div>
   );
};

export default memo(CustomButtonBlock)
