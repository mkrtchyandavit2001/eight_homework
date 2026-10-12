import React, { useEffect, useRef, useState } from 'react';
import './Newses.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllNewses,
  getPaginatePages,
  getSearchesNewses,
} from '../../store/slices/newses/NewsesApi';
import {
  getDataAllNewses,
  getLoadingNewses,
  getPaginateLength,
} from '../../store/slices/newses/NewsesSlice';
import ReactPaginate from 'react-paginate';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoadSpinner from '../LoadSpinner/LoadSpinner';

function Newses() {
  const { t, i18n } = useTranslation();
  const lang = localStorage.getItem('lang');
  const navigate = useNavigate();
  // const [sizes, setSizes] = useState(45);
  const textInputRef = useRef(null);
  const dispatch = useDispatch();
  const DataAllNews = useSelector(getDataAllNewses);
  const loading = useSelector(getLoadingNewses);
  const paginateLength = useSelector(getPaginateLength);
  const [newsSearch, setNewsSearch] = useState(false);
  const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';


  useEffect(() => {
    // console.log(changeFonSize, 777777);
    // dispatch(getAllNewses());
    dispatch(getPaginatePages());
    window.scrollTo(0, 0);
    // setSizes(changeFonSize === 'large' ? 45 : changeFonSize === 'medium' ? 30 : 20);
  }, []);

  const searchNews = (e) => {
    e.preventDefault();
    dispatch(getSearchesNewses(textInputRef.current.value));
    textInputRef.current.value = '';
    // if (DataAllNews.length > 5) {
    setNewsSearch(true);
    // }
  };

  const handlePageClick = (data) => {
    window.scrollTo(0, 300);
    // console.log(data.selected);
    let currentPage = data.selected + 1;
    dispatch(getPaginatePages(currentPage));
  };

  return (
    <>
      {loading ? (
        <LoadSpinner fullBackColor="white"/>
      ) : (
        <div className="all_news">
          {/* <div className="lines_div">
              <img className="border_1" src={require('../../images/Line 106.png')} alt="" />
              <h2 style={{ textTransform: 'uppercase' }}>NEWS</h2>
              <img className="border_2" src={require('../../images/Line 106.png')} alt="" />
            </div>
            <p style={{ textAlign: 'center', color: 'white', marginTop: '20px' }}>
            Armenian cultural news
            </p> */}
          <div className="container">

            <div className='lines_div_event'>
              <div>
                <img src={require('../../images/Line 106.png')} alt="" />
                <h2>{t('news_titles.0')}</h2>
                <img src={require('../../images/Line 106.png')} alt="" />
              </div>
              <h3>{t('news_titles.1')}</h3>
            </div>
            <div className="all_news_contain">
              <form onSubmit={(e) => searchNews(e)} className="form_newses">
                <input type="text" name="text" ref={textInputRef} className="form_input" placeholder={t('news_titles.2')} />
                {/* <button type="submit" className="form_button">
            {t('newses_page_data.1')}
            </button> */}
                <button className="input-search-buttonn_news">{t('news_titles.2')}</button>
              </form>
              <div
                className={
                  DataAllNews.length === 0 || DataAllNews.length > 4 ? 'newsess' : 'newsess_start'
                }>
                {DataAllNews.length !== 0
                  ? DataAllNews.map((el, index) => (
                    <div
                      className="news_box"
                      key={index}
                      onClick={() => navigate(`/${lang}/news/${el.id}`)}>
                      <div className="news_box-image">
                        <img src={el.image} alt={el.title} />
                        <div className='news_page_navigate_div'>
                          <button className='news_page_navigate_div_btn' onClick={() => navigate(`/${leng}/events/${el.id}`)}>{t('event_single_page.0')}</button>
                        </div>
                      </div>
                      <div className="news-box_texts_div">
                        <p className="shop-box-title">
                          {el.title?.length > 45 ? el.title.slice(0, 45) + '...' : el.title}
                        </p>
                        <p className="shop-box-price">{el.price}</p>
                        <span style={{ color: "#666666" }}>{el.created_at}</span>
                      </div>
                      {/* <div className="news_box_title">
                        <p>{el.title.length > 58 ? el.title.slice(0, 58) + ' ...' : el.title}</p>
                      </div> */}
                    </div>
                  ))
                  : <h3 style={{ fontWeight: '100' }}>{t('single_shop_page.3')}</h3>}
              </div>
              <div
                className={
                  DataAllNews.length !== 0 && !newsSearch ? 'pagination' : 'pagination_none'
                }>
                <ReactPaginate
                  previousLabel={paginateLength > 1 && '<'}
                  nextLabel={ paginateLength > 1 && '>'}
                  breakLabel={'...'}
                  pageCount={paginateLength !== null ? paginateLength : ''}
                  marginPagesDisplayed={3}
                  onPageChange={handlePageClick}
                  containerClassName={'paginationn'}
                  pageClassName={'page-items'}
                  pageLinkClassName={'page-link'}
                  previousClassName={'prev-item'}
                  nextClassName={'next-item'}
                  breakClassName={'break-item'}
                  activeClassName={'active-itemm'}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Newses;
