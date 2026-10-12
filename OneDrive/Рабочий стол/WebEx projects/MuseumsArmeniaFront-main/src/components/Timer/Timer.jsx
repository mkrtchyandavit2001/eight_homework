import React, { useState, useEffect } from 'react';
import './Timer.css'
import { useDispatch, useSelector } from 'react-redux';
import { selectRepeatVerifyLoading } from '../../store/slices/RepeatVerifyCodeSlice/RepeatVerifyCodeSlice';
import { useTranslation } from 'react-i18next';

const Timer = ({email, axios}) => {
  const [timeRemaining, setTimeRemaining] = useState(2);
  const [timerFinished, setTimerFinished] = useState(false);
  const {t, i18n} = useTranslation()
  const dispatch = useDispatch()
  useEffect(() => {
    if (timeRemaining > 0) {
      const timerId = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      return () => {
        clearTimeout(timerId);
      };
    } else {
      setTimerFinished(true);
    }
  }, [timeRemaining]);

  const handleRestartTimer = () => {
    if (timerFinished) {
        setTimeRemaining(5);
    setTimerFinished(false);
        dispatch(axios({email: email.current.value}))
    }
  };

  return (
   <div>
      <div id="timer">{timerFinished ? t('verifyAccount.1') : `${t('verifyAccount.1')} ${timeRemaining} ${t('verifyAccount.4')}`}</div>
      <div className='repeat_code'>
        <span>{t('verifyAccount.2')}</span>
        <span style={{color: timerFinished ?  'var(--second_font_color)' : 'gray'}} onClick={handleRestartTimer}>{t('verifyAccount.3')}</span>
      </div>
    </div>
  );
};

export default Timer;
