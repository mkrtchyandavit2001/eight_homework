import React, { useEffect, useRef, useState } from 'react';
import './ProfilePage.css';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ProfileSidebar from './ProfileSidebar/ProfileSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { selectSideBar } from '../../store/slices/ProfilePageSlice/ProfilePageSlice';

function ProfilePage() {
  const navigate = useNavigate();
  const lang = localStorage.getItem('lang');
  const respSideBar = useSelector(selectSideBar)
  const rightDivRef = useRef(null)
  const {pathname} = useLocation()
  useEffect(() => {
    // Redirect to the MyAccount page when ProfilePage is accessed
    // window.location.pathname = `${lang}/profilePage/myaccount`;
    navigate(`/${lang}/profilePage/myaccount`);
  }, []);
  // useEffect(() => {
  //   navigate({ replace: true });
  // }, []);


  
  useEffect(() =>{
    const f = (e) => {
      
    if(respSideBar && (window.innerWidth < 1024 && window.innerWidth > 720)){
      rightDivRef.current.style.width = '100%'
    }
    else if(respSideBar && (window.innerWidth < 1024 && window.innerWidth > 720) && pathname === `/${lang}/profilePage/orderhistory`){
      rightDivRef.current.style.width = '85%'
    }
    else if (respSideBar && (window.innerWidth < 720 && window.innerWidth > 480)) {
      rightDivRef.current.style.width = '60%'
    }
    else if(respSideBar && (window.innerWidth < 480) ){
      rightDivRef.current.style.width = '40%'
    }
    else{
      rightDivRef.current.style.width = '85%'
    }

    }

    f()
},[respSideBar])

  useEffect(() =>{

    const handleResize = () => {
      if(respSideBar && (window.innerWidth < 1024 && window.innerWidth > 720)){
        rightDivRef.current.style.width = '100%'
      }
      else if (respSideBar && (window.innerWidth < 720 && window.innerWidth > 480)) {
        rightDivRef.current.style.width = '60%'
      }
      else if(respSideBar && (window.innerWidth < 480) ){
        rightDivRef.current.style.width = '40%'
      }
      
      else{
        rightDivRef.current.style.width = '85%'
      }
   };
   window.addEventListener('resize', handleResize);

   return () => {
      window.removeEventListener('resize', handleResize);
   };

  },[respSideBar, window.innerWidth])




  return (
    <div className="ProfilePage_all">
        <div className="ProfilePage_bigDiv">
          <ProfileSidebar />
          <div ref={rightDivRef} className='ProfilePage_bigDiv_right'>
            <Outlet />
          </div>
      </div>
    </div>
  );
}

export default ProfilePage;
