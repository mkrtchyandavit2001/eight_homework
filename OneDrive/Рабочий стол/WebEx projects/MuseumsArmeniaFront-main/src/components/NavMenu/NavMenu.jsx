import React from 'react'
import NavMenuItem from '../NavMenuItem/NavMenuItem'
import './NavMenu.css'
function NavMenu() {
  return (
    <ul className='nav_menu'>
        <NavMenuItem  txt="0" path = '/'/> 
        <NavMenuItem  txt="1" path = "/museums"/> 
        <NavMenuItem  txt="2" path = "/events"/> 
        <NavMenuItem  txt="3" path = "/store"/>
        <NavMenuItem  txt="4" path = "/news"/>
        <NavMenuItem  txt="5" path = "/aboute-us"/> 
        <NavMenuItem  txt="6" path = "/contact"/>
    </ul>
  )
}

export default NavMenu