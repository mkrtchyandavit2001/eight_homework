import React, { useEffect, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchBlockMuseumPage, CustomSectionTitle, MuseumMinBlock, IsWrong } from './index';
import { postMuseumPages } from '../../store/slices/MuseumPagesSlice/MuseumPagesApi';
import LoadSpinner from '../LoadSpinner/LoadSpinner';
import { useDispatch, useSelector } from 'react-redux';
import abouteUsBack from '../../images/abouteUsBack.jpg';
import './museumPage.css';

const MuseumPage = () => {
   const dispatch = useDispatch();
   const { t, i18n } = useTranslation();
   const { loadingStatus, filterDataMuseum, regions } = useSelector((state) => state.museumPages);
   
   // State to store shuffled data
   const [shuffledData, setShuffledData] = useState([]);

   useEffect(() => {
      dispatch(postMuseumPages());
   }, [dispatch]);

   useEffect(() => {
      if (filterDataMuseum.length > 0) {
         setShuffledData(shuffleArray(filterDataMuseum)); 
      }
   }, [filterDataMuseum]);

   // Function to shuffle an array (Fisher-Yates Algorithm)
   const shuffleArray = (array) => {
      let shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      return shuffledArray;
   };

   return (
      <>
         {loadingStatus === 'loading' ? (
            <LoadSpinner fullBackColor="white" />
         ) : loadingStatus === 'fulfilled' ? (
            <div style={{ minHeight: '100vh', backgroundImage: `url(${abouteUsBack})`, padding: "60px 0" }}>
               <div className="museumPage_section">
                  <CustomSectionTitle
                     text={t(`musseumPage_title.0`)}
                     text2={t(`mintitle`)}
                     color="#FFFFFF"
                     colorSvg="#FFFFFF"
                  />
                  <div
                     className="container section"
                     style={{
                        backgroundColor: '#ffffff',
                     }}>
                     <SearchBlockMuseumPage regions={regions} />
                     <div className="par_museumList">
                        {shuffledData.map((item) => (
                           <MuseumMinBlock {...item} key={item.id} />
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         ) : (
            <IsWrong text={t(`isWrong.0`)} />
         )}
      </>
   );
};

export default memo(MuseumPage);
