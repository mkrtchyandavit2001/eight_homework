import React, { useEffect } from 'react';
import { home_page_news_section_data } from '../../data/data';
import './NewsSectionInHome.css';
import ButtonSecond from '../ButtonSecond/ButtonSecond';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getPaginatePages } from '../../store/slices/newses/NewsesApi';
import { getDataAllNewses } from '../../store/slices/newses/NewsesSlice';
import { useNavigate } from 'react-router-dom';

function NewsSectionInHome() {
  const { t, i18n } = useTranslation();
  const lang = localStorage.getItem('lang');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const DataAllNews = useSelector(getDataAllNewses);
  const DataAllNewsSlice = DataAllNews.slice(0, 3);

  useEffect(() => {
    dispatch(getPaginatePages());
  }, []);

  return (
    <div className="news_section_in_home">
      <div className="container">
        <div className='lines_div_section_news_section'>
                <img src={require('../../images/line_gold.png')} alt="line" />
                <h2>{t('news_section_title')}</h2>
                <img src={require('../../images/line_gold.png')} alt="line" />
        </div>

        <div className="news_section_in_home_block">
        
          <div className="newsess_home_page">
            {DataAllNews.length !== 0
              ? DataAllNews.slice(0, 3).map((el, index) => (
                  <div
                    className="news_box_home_page"
                    key={index}
                    onClick={() => navigate(`/${lang}/news/${el.id}`)}>
                    <div className="news_box_image">
                      <img src={el.image} alt={el.title} loading="lazy" />
                    </div>
                    <div className="news_box_title">
                      <span className='created_at_news_box'>{el.created_at}</span>
                      <span className='desc_news_box'>{el.title.length > 58 ? el.title.slice(0, 58) + ' ...' : el.title}</span>
                    </div>
                  </div>
                ))
              : 'Տվյալներ չեն գտնվել'}
          </div>

          <ButtonSecond txt="1" path={"news"} />
        </div>
      </div>
    </div>
  );
}

export default NewsSectionInHome;
