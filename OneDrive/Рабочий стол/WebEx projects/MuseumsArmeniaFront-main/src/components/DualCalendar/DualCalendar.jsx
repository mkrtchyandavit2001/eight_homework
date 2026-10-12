import React from 'react';
import './DualCalendar.css';
import { DatePicker } from 'antd';
import { useDispatch } from 'react-redux';
import { getPrivateTicket } from '../../store/slices/PrivateTicketSlice/PrivateTicketApi';
import { useTranslation } from 'react-i18next';

const { RangePicker } = DatePicker;

function DualCalendar({ museum, setStartDate, setEndDate, museumItem, setEventLineCalendar }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      const start = dates[0].format('YYYY-MM-DD');
      const end = dates[1].format('YYYY-MM-DD');
      sessionStorage.setItem('start_date', start);
      sessionStorage.setItem('end_date', end);
      setStartDate(start);
      setEndDate(end);

      dispatch(getPrivateTicket({
        type: 'event',
        startDate: start,
        endDate: end,
        museumId: museum ? museumItem?.id : null
      }));
    } else {
      dispatch(getPrivateTicket({ type: 'event', startDate: null, endDate: null, museumId: null }));
    }
  };

  const handleCalendarClick = (e) => {
    e.stopPropagation();
    setEventLineCalendar(false);
  };

  return (
    <div className="dual-calendar-container">
      <RangePicker
        onChange={handleDateChange}
        onClick={handleCalendarClick}
        placeholder={[t('start_date'), t('end_date')]}
        style={{ width: '100%', overflowX: 'auto' }} // ensures full width in container
      />
    </div>
  );
}

export default DualCalendar;
