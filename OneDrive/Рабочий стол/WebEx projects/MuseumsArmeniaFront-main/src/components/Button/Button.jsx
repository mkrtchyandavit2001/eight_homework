import React from 'react'
import './Button.css'
import { useTranslation } from 'react-i18next'

function Button({txt,onClick = () => {},}) {

  const {t, i18n} = useTranslation()
  
  return (
    <button className="btn draw-border" onClick={onClick}>{t('buttons.' + txt)}</button>
  )
}

export default Button