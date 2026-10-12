import React, { useEffect } from 'react';
import './SingleNews.css';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleNews } from '../../store/slices/newses/NewsesApi';
import { getLoadingNewses, getSingleNewsDate } from '../../store/slices/newses/NewsesSlice';
import { useParams } from 'react-router-dom';
import LoadSpinner from '../LoadSpinner/LoadSpinner';
import { useTranslation } from 'react-i18next';

function SingleNews() {
  const params = useParams();
  const dispatch = useDispatch();
  const SingleNewsDate = useSelector(getSingleNewsDate);
  const loading = useSelector(getLoadingNewses);
  const {t, i18n} = useTranslation()

  useEffect(() => {
    dispatch(getSingleNews(params.id));
  }, []);


  return (
    <>
      {loading ? (
        <LoadSpinner fullBackColor="white" />
      ) : (
        <div className="SingleNews_all">
         
          <div className="container">
          <div className='lines_div_event'>
              <div>
                <img src={require('../../images/Line 106.png')} alt="" />
                <h2>{t('news_titles.0')}</h2>
                <img src={require('../../images/Line 106.png')} alt="" />
              </div>
              <h3>{t('news_titles.1')}</h3>
            </div>

          <div className="all_singleNews_contain">
            <div className="single-news">
              <h2 className="single-news-title">{SingleNewsDate.title}</h2>
              <div className="imag_and_date">
                <img
                  src={SingleNewsDate.image}
                  alt={SingleNewsDate.title}
                  className="image-single-news"
                />
                <p className="single-news-created_at">{SingleNewsDate.created_at}</p>
              </div>

              <p className="single-news-description">{SingleNewsDate.description}</p>
            </div>
          </div>
        </div>
        </div >
      )
}
    </>
  );
}

export default SingleNews;
