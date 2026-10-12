import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ButtonSecond from '../../ButtonSecond/ButtonSecond';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Keyboard, Pagination, Navigation } from 'swiper/modules';

const OurEvents = ({ dataMuseumOneEvents }) => {
   const { t, i18n } = useTranslation();
   const navigate = useNavigate();
   const [windowWidth, setWindowWidth] = React.useState(2000);
   const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';
   useEffect(() => {
      const handleResize = () => {
         setWindowWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   return (
      <div className="museumOne_pageStyle">
         <h4 className="museumOne_title">{t(`ourEvents`)}</h4>
         <div style={{ marginTop: '10px' }}>
            <>
               <Swiper
                  slidesPerView={
                     windowWidth <= 900 && windowWidth > 620 ? 2 : windowWidth <= 620 ? 1 : 3
                  }
                  spaceBetween={10}
                  keyboard={{
                     enabled: true,
                  }}
                  pagination={{
                     clickable: true,
                  }}
                  navigation={true}
                  modules={[Keyboard, Pagination, Navigation]}
                  className="OurEventsSwiper">
                  {dataMuseumOneEvents.map((item) => (
                     <SwiperSlide key={item.id}>
                        <div className="block_eventMuseum">
                           <div className="block_eventMuseum-img">
                              <img src={item.image} alt="" />
                           </div>
                           <div className="block_eventMuseum-desc">
                              <div>
                                 <p>{item.name.slice(0, 30)} ...</p>
                                 <p>
                                    {item.start_date}-{item.end_date}| {item.price} ֏
                                 </p>
                                 <ButtonSecond
                                    txt="9"
                                    minWidth="120px"
                                    background={'#D5AA72'}
                                    color={'#FFFFFF'}
                                    maxWidth={'160px'}
                                    fontSize="12px"
                                    onClick={() => navigate(`/${leng}/events/${item.id}`)}
                                    newClass="newStyleBtn"
                                 />
                              </div>
                           </div>
                        </div>
                     </SwiperSlide>
                  ))}
               </Swiper>
            </>
         </div>
      </div>
   );
};

export default React.memo(OurEvents);
