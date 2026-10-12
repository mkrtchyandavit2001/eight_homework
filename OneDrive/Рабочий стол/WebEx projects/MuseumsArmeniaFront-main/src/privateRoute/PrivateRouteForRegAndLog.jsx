import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthUser, getIsAuth } from '../store/slices/Auth/AuthSlice';
import { getCurrentUser } from '../store/slices/Auth/AuthApi';
import './PrivateRoute.css'
import { Navigate } from 'react-router-dom';
import LoadSpinner from '../components/LoadSpinner/LoadSpinner';

const PrivateRouteForRegAndLog = ({ children }) => {
    const lang = localStorage.getItem('lang');
    const dispatch = useDispatch();
    const isAuth = useSelector(getIsAuth);
    const authUser = useSelector(getAuthUser);
    const [loading, setLoading] = useState(true);
    const localIsAuth  = localStorage.getItem('isAuth')
    const token  = localStorage.getItem('token')

    useEffect(() => {
      const fetchData = async () => {
        if (localIsAuth && token) {
          await dispatch(getCurrentUser());
        }
        setLoading(false); 
      };
      fetchData();
    }, []);
  
    if (loading) {
      return <LoadSpinner fullBackColor="white"/>
    }
    
    return !isAuth ? children : <Navigate to={`/${lang}/`} />;

  //  if (sesionIsAuth) {
  //   return <Navigate to={`/${lang}/profilePage/dashboard`}/>
  //  }
  //  else{
  //   return children
  //  }
  };


export default PrivateRouteForRegAndLog;