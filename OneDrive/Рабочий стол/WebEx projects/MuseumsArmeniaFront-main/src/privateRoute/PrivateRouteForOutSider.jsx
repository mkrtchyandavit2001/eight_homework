import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthUser, getIsAuth } from '../store/slices/Auth/AuthSlice';
import { getCurrentUser } from '../store/slices/Auth/AuthApi';
import './PrivateRoute.css';
import LoadSpinner from '../components/LoadSpinner/LoadSpinner';

const PrivateRouteForOutSider = ({ children }) => {
   const dispatch = useDispatch();
   const isAuth = useSelector(getIsAuth);
   const [loading, setLoading] = useState(true);
   const localIsAuth = localStorage.getItem('isAuth');

   useEffect(() => {
      const fetchData = async () => {
         if (!isAuth && localIsAuth) {
            await dispatch(getCurrentUser());
           
         }
         setLoading(false);
      };
      fetchData();
   }, [dispatch, isAuth]);

   if (loading) {
      return (
         <LoadSpinner fullBackColor="white"/>
      );
   }

   return children;
};

export default PrivateRouteForOutSider;
