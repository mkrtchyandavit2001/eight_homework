import React from 'react';

import ButtonSecond from '../../ButtonSecond/ButtonSecond';

import reserveImg from '../../../images/reserveImg.png';
import reserveImg2 from '../../../images/reserveImg2.png';

const MuseumOneDescription = ({
   oneMuseum,
   description = '',
   photos = [],
   handleClickTicket = () => {},
   openBtn = false,
   ticketType = {},
}) => {
   const [activImg, setActivImg] = React.useState(photos[0] || reserveImg);
   const [img1, setImg1] = React.useState(photos[1] || reserveImg);
   const [img2, setImg2] = React.useState(photos[2] || reserveImg2);

   const setClickImg = React.useCallback(
      (x) => {
         let reserve = activImg;
         switch (x) {
            case 1:
               setActivImg(img1);
               setImg1(reserve);
               break;

            case 2:
               setActivImg(img2);
               setImg2(reserve);
               break;

            default:
               break;
         }
      },
      [activImg],
   );

   
   // const validMuseum = oneMuseum?.id === 1 || oneMuseum?.id  === 2  || oneMuseum?.id === 4 || oneMuseum?.id === 5 || oneMuseum?.id === 7 || oneMuseum?.id === 8  || oneMuseum?.id === 9  || oneMuseum?.id === 10  || oneMuseum?.id === 11  || oneMuseum?.id === 12  || oneMuseum?.id === 13  || oneMuseum?.id === 14  || oneMuseum?.id === 15  || oneMuseum?.id === 16  || oneMuseum?.id === 17  || oneMuseum?.id === 18 || oneMuseum?.id === 19 || oneMuseum?.id === 20 || oneMuseum?.id === 21 || oneMuseum?.id === 22 || oneMuseum?.id === 26
   return (
      <div className="museumOne_pageStyle">
         {oneMuseum.is_buy_ticket && openBtn && (
            <ButtonSecond
               txt="9"
               minWidth="210px"
               background={ticketType.type === 'Buy Ticket' ? '#3F3D56' : '#D5AA72'}
               color={'#FFFFFF'}
               maxWidth={'250px'}
               onClick={() => handleClickTicket('ticket', 'Buy Ticket')}
               newClass="newStyleBtn"
            />
         )}
         {/* <h4 className="museumOne_title">{t(`description_museum`)}...</h4> */}
         <p>{description}</p>
         {photos.length > 0 && (
            <div className="MuseumOne_parent-imgList">
               <div
                  onClick={() => setClickImg(1)}
                  className="MuseumOne_parent-imgList_img"
                  style={{ backgroundImage: `url(${img1})`, marginRight: '-30px' }}></div>
               <div
                  className="MuseumOne_parent-imgList_imgCenter"
                  style={{ backgroundImage: `url(${activImg})` }}></div>
               <div
                  onClick={() => setClickImg(2)}
                  className="MuseumOne_parent-imgList_img"
                  style={{ backgroundImage: `url(${img2})`, marginLeft: '-30px' }}></div>
            </div>
         )}
      </div>
   );
};

export default React.memo(MuseumOneDescription);
