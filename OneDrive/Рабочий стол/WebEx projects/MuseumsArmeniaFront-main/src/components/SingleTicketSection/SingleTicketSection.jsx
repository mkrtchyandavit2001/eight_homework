import React, { useEffect } from 'react';
import './SingleTicketSection.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getUnitedCount } from '../../store/slices/PrivateTicketSlice/PrivateTicketApi';
import { selectUnitedCount } from '../../store/slices/PrivateTicketSlice/PrivateTicketSlice';

function SingleTicketSection() {
  const { t, i18n } = useTranslation();
  const leng = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'am';
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const respCount = useSelector(selectUnitedCount);
  
  useEffect(() => {
        dispatch(getUnitedCount());
  }, []);


  const minMuseumQuantity = respCount.data ? respCount.data?.min_museum_quantity : 'def';
  const discountPercent = respCount.data ? respCount.data?.discount_percent : 'def';

  const singleTicketData = {
    title: t('ticketsType.2'),
    txt: `${t('section_united_ticket.0')} ${minMuseumQuantity} ${t('section_united_ticket.1')} ${discountPercent} ${t('section_united_ticket.2')}`,
    img: require('../../images/teecket-back.png')
  };
   
  return (
    <div className="single_tecket">
      <div
        className="single_tecket_item"
        style={{ backgroundImage: `url(${singleTicketData.img})` }}>
        <div className="darck_fon">
          <div className="container">
            <h2>{singleTicketData.title}</h2>
            <div className='line_div_darck_fon'>
              <img src={require('../../images/Line 108.png')} alt="" />
              <p>{singleTicketData.txt}</p>
              <img src={require('../../images/Line 108.png')} alt="" />
            </div>
            <Button txt="0" onClick={() => navigate(`/${leng}/comboticket`)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleTicketSection;
