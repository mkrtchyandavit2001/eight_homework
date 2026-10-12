import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Shop.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllShop,
  getCategoryShop,
  getMuseumNames,
  postShopCardData,
} from '../../store/slices/Shop/ShopApi';
import {
  getAllShopDate,
  getBaskettotalPrice,
  getCategories,
  getLoadingShop,
  getMuseumsNames,
  getSetModalIsOpenShop,
  setModalIsOpenShop,
} from '../../store/slices/Shop/ShopSlice';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CardModal from './CardModal';
import { getIsAuth } from '../../store/slices/Auth/AuthSlice';
import LoadSpinner from '../LoadSpinner/LoadSpinner';
import { dropDownIcon, museumIcon } from '../../iconFolder/icon';

function Shop() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';
  const dispatch = useDispatch();
  const searchTextShopRef = useRef(null);
  const AllShopData = useSelector(getAllShopDate);
  const loading = useSelector(getLoadingShop);
  const allCategories = useSelector(getCategories);
  const allmuseumNames = useSelector(getMuseumsNames);
  const IsAuth = useSelector(getIsAuth);
  const ModalIsOpenShop = useSelector(getSetModalIsOpenShop);
  const [isPagination, setIsPagination] = useState(true);
  const [isFiltered, setIsFiltered] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState({ name: '', id: '', value: '' });
  const [selectedMuseum, setSelectedMuseum] = useState({ name: '', id: '', value: '' });
  const [errorText, setErrorText] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [openMuseumModal, setOpenMuseumModal] = useState(false)
  const [openModal, setopenModal] = useState(false)
  const prodCategory = t('shop_product_category', { returnObjects: true })
  const museumRef = useRef(null)
  const categoryRef = useRef(null)

 
  useEffect(() => {
    window.scrollTo(0, 250);
    console.log('useFfecti masss');
    dispatch(getCategoryShop()).then(() => {
      dispatch(getMuseumNames());
    });
    const paginateDataObj = {
      currentPage: 1,
      searchText: '',
      museum_id: '',
      categora_id: '',
    };
    dispatch(getAllShop(paginateDataObj));

  }, []);


  const sendShopPage = useCallback((data) => {
    window.scrollTo(0, 300);
    let currentPage = data.selected + 1;
    const paginateDataObj = {
      museum_id: selectedMuseum.id,
      categora_id: selectedCategory.id,
      currentPage: currentPage,
      searchText: searchTextShopRef.current.value,
    };

    dispatch(getAllShop(paginateDataObj));
  }, []);


  let SearchProductLength = AllShopData.data?.length;

  const searchShop = useCallback((e) => {
    e.preventDefault();
    SearchProductLength < 12 && setIsPagination(false);
    const paginateDataObj = {
      museum_id: selectedMuseum.id,
      categora_id: selectedCategory.id,
      currentPage: 1,
      searchText: searchTextShopRef.current.value,
    };

    dispatch(getAllShop(paginateDataObj));
   
  }, []);

  const handleClickOpenModal = useCallback((id, image, name, price, museumName) => {
    return (e) => {
      e.stopPropagation();
      console.log('IsAuth', IsAuth);
      if (IsAuth) {
        dispatch(setModalIsOpenShop(true));
        dispatch(postShopCardData({ id }));
      } else {
       
        navigate(`/${leng}/login`);
      }
    };
  }, []);




  // =========================================



  const handleMuseumItem = (event, museum) => {
    const paginateDataObj = {
      currentPage: 1,
      searchText: '',
      museum_id: museum.id,
      categora_id: selectedCategory.id,
    };
    setCurrentPage(0);

    dispatch(
      getAllShop(paginateDataObj),
    );

    setSelectedMuseum({value: museum.name, id: museum.id});
  }

  const handleDelMuseum = (event) => {
    const key = event.key;
    if (key === 'Backspace' || key === 'Delete') {
      setSelectedMuseum({ name: '', id: '', value: '' })
    }
  };


  // ===========================

  const handleKeyDown = (event) => {
    const key = event.key;
    if (key === 'Backspace' || key === 'Delete') {
        setSelectedCategory('')
    }
};


const handleCategoryItem = (e,category) => {
  console.log(category.id,'66');
  setSelectedCategory({value: e.target.innerText, id: category.id})
  const paginateDataObj = {
    currentPage: 1,
    searchText: '',
    museum_id: selectedMuseum.id,
    categora_id: category.id,
  };

  console.log(paginateDataObj,'jannn');
  dispatch(
    getAllShop(paginateDataObj),
  );
}


useEffect(() => {

  const hendelClick = (e) => {
      let path = e.composedPath ? e.composedPath() : e.path
      let path2 = e.composedPath ? e.composedPath() : e.path


      if (!path.includes(categoryRef.current)) {
          setopenModal(false)
      }
      if (!path2.includes(museumRef.current)) {
          setOpenMuseumModal(false)
      }

  }

  window.addEventListener('click', hendelClick)
  return () => window.removeEventListener('click', hendelClick)

}, [])

  return (
    <>
      {loading ? (
        <LoadSpinner fullBackColor="white" />
      ) : (
        <div className="shop_all">
          <div className="container">
            <div className='lines_div_event'>
              <div>
                <img src={require('../../images/Line 106.png')} alt="" />
                <h2>{t('shop_page_title.0')}</h2>
                <img src={require('../../images/Line 106.png')} alt="" />
              </div>
              <h3>{t('shop_page_title.1')}</h3>
            </div>
            <div className="all_Shop_Content">
              <div className="input_and_filteres">
                <form className="form_shop" onSubmit={(e) => searchShop(e)}>
                  <div className="input-container-shop">
                    <input
                      type="text"
                      ref={searchTextShopRef}
                      className="input-search-searchIcon"
                      placeholder={t('shop_search')}
                    />
                    <button className="input-search-buttonn">{t('shop_search')}</button>
                  </div>
                </form>

                <div className="fileress">
                  <div className="custom-select-container">

                    <div className='shop_category_filter' ref={categoryRef}>
                      <div className='shop_category_filter_inp_div'>
                        <input type="text" value={selectedCategory.value || ''} onKeyDown={handleKeyDown} onClick={() => setopenModal(!openMuseumModal)} onChange={() => { }} placeholder={t('shop_page_data.1')} />
                        <span>{dropDownIcon}</span>
                      </div>

                      {openModal && <ul className='events_page_filter_museum_list' onClick={() => setopenModal(false)}>
                        <li onClick={(e) => handleCategoryItem(e, { name: t('allMussseum'), id: '' })}><p>{t('allMussseum')}</p></li>
                        {
                          allCategories.map(museum =>
                            <li key={museum.id} >
                                <p onClick={(e,) => handleCategoryItem(e, museum)} className='category_filter_item_p'>
                                {prodCategory.find(el => Object.keys(el)[0] === museum.key) && Object.values(prodCategory.find(el => Object.keys(el)[0] === museum.key))[0]} 
                                </p>
                              </li>
                          )
                        }
                      </ul>}
                    </div>

                  </div>

                  {/* //// */}
                  <div className="custom-select-container">

                    <div className='shop_museum_filter' ref={museumRef}>
                      <div className='shop_museum_filter_inp_div'>
                        <input type="text" value={selectedMuseum.value || ''} onKeyDown={handleDelMuseum} onClick={() => setOpenMuseumModal(!openMuseumModal)} onChange={() => { }} placeholder={t('shop_page_data.2')} />
                        <span>{dropDownIcon}</span>
                      </div>

                      {openMuseumModal && <ul className='events_page_filter_museum_list' onClick={() => setOpenMuseumModal(false)}>
                        <li onClick={(e) => handleMuseumItem(e, { name: t('allMussseum'), id: '' })}><span>{museumIcon}</span> <p>{t('allMussseum')}</p></li>
                        {
                          allmuseumNames.map(museum =>
                            <li key={museum.id} onClick={(e,) => handleMuseumItem(e, museum)}><span>{museumIcon}</span> <p>{museum.name}</p></li>
                          )
                        }
                      </ul>}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={
                  AllShopData.data?.length === 0 || AllShopData.data?.length > 2
                    ? 'shopess'
                    : 'shopess_start'
                }>
                {AllShopData && AllShopData.data?.length !== 0
                  ? AllShopData.data?.map((el, index) => (
                    <div
                      className="shop-box"
                      key={index}
                      >
                      <div className="shop-box_img">
                        <img src={el.image} alt={el.image} />
                        <div className="souvenir_item_add_cart_div">

                          <div
                            className="shop-box_button"
                            onClick={handleClickOpenModal(
                              el.id,
                              el.image,
                              el.name,
                              el.price,
                              el.museum_name,
                            )}>
                            {t('buttons.12')}
                          </div>
                        </div>
                      </div>
                      <div className="shop-box_texts_div" onClick={() => navigate(`/${leng}/store/${el.id}`)}>
                        <p>{el.museum_name}</p>
                        <span className="shop-box-title">
                          {el.name?.length > 45 ? el.name.slice(0, 45) + '...' : el.name}
                        </span>
                        <p className="shop-box-price">{el.price} AMD</p>
                      </div>
                    </div>
                  ))
                  : t('shop_page_data.3')}
              </div>
              <div
                className={
                  AllShopData.data?.length !== 0 &&
                    AllShopData.meta?.per_page < AllShopData.meta?.total
                    ? 'shop-paginate'
                    : 'shop-paginate-none'
                }>
                <ReactPaginate
                  previousLabel={'<'}
                  nextLabel={'>'}
                  breakLabel={'...'}
                  forcePage={AllShopData.meta?.current_page - 1}
                  pageCount={
                    AllShopData.meta?.last_page !== null ? AllShopData.meta?.last_page : ''
                  }
                  marginPagesDisplayed={3}
                  // onPageChange={(selected) => sendShopPage(selected.selected)}
                  onPageChange={sendShopPage}
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
          <CardModal />
        </div>
      )}
    </>
  );
}

export default Shop;