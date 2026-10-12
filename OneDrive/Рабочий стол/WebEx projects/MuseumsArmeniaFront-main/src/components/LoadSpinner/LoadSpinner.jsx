import React from 'react'
import './LoadSpinner.css'

function LoadSpinner({fullBackColor}) {
  return (
    <div className='load_div' style={{backgroundColor: fullBackColor && fullBackColor }}><span className="loader"></span></div>
  )
}

export default LoadSpinner