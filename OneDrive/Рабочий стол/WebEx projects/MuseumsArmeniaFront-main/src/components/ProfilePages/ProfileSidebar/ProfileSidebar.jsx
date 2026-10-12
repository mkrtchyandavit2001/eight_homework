import React, { useState } from 'react';
import './ProfileSidebar.css';
import { ProfileSidebarArrll } from '../../../helper/ProfileSidebarHelp/ProfileSidebarHelp';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectSideBar, setSideBar } from '../../../store/slices/ProfilePageSlice/ProfilePageSlice';

function ProfileSidebar() {
  const ProfileSidebarArr = ProfileSidebarArrll();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const respSideBar = useSelector(selectSideBar)
 const handleOnMouseOver = (e) => {
  dispatch(setSideBar(true))
 }

 const handleOnMouseOut = (e) => {
  dispatch(setSideBar(false))
 }


  return (
    <div className="ProfileSidebar_all" onMouseOver={handleOnMouseOver} onMouseOut={handleOnMouseOut}>
      <div className="ProfileSidebar_bigDiv" style={{width: respSideBar ? '210px' : '60px'}}>
        {ProfileSidebarArr.map((el, index) => (
          <div key={index} className="profileSIdebar_divs">
            <NavLink
              className={({ isActive }) => (isActive ? 'line_div  line_divActive' : 'line_div')}
              to={el.slug}>
              <span className='line_div_profile_icon'>{el.icon}</span>
              <span>{el.name}</span>
            </NavLink>
          </div>  
        ))}
      </div>
    </div>
  );
}

export default ProfileSidebar;
