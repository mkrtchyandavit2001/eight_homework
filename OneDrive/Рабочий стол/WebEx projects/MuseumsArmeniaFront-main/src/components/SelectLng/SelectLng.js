import React, { useEffect, useState } from 'react'
import './SelectLng.css'
import { useTranslation } from 'react-i18next'
import '../..//translatedFolder/i18n';
import { globIcon } from '../../iconFolder/icon';

function SelectLng() {
  const leng = localStorage.getItem('lang')
    const [defaultLng, setDefaultLng] = useState('')
    const {t, i18n} = useTranslation()

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        const prevLng = localStorage.getItem('lang')
        const pathname = window.location.pathname
        const result = pathname.replace('/'+prevLng, '/'+lng)
        localStorage.setItem('lang', lng)

        window.location.href = result
      };

        useEffect(()=> {
          if (leng === null) {
             localStorage.setItem('lang', 'am')
          }
       },[leng])


    useEffect(()=>{
      if (leng == "en") {
        setDefaultLng('Eng')
      }
      else if(leng == "ru"){
        setDefaultLng("Рус")
      }
      else{
        setDefaultLng('Հայ')
      }
    },[defaultLng])
      

  return (
    <div className='select-lng'>
       <span>{globIcon}</span>
       <ul className='lng-list'>
          {defaultLng !== 'Հայ' && <li id="am" onClick={(e) => changeLanguage(e.target.id)}>Հայ</li>}
          {defaultLng !== 'Рус' && <li id="ru" onClick={(e) => changeLanguage(e.target.id)}>Рус</li>}
          {defaultLng !== 'Eng' && <li id="en" onClick={(e) => changeLanguage(e.target.id)}>Eng</li>}
       </ul>
    </div>
  )
}

export default SelectLng