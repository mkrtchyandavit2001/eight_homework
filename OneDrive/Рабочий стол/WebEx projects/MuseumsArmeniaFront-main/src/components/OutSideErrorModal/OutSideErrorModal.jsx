import React from 'react'
import './OutSideErrorModal.css'

function OutSideErrorModal({txt, shadow}) {
  return (
    <div className='out_side_error_modal' style={{boxShadow: shadow ? '0 0 5px gray' : ''}}>
        <span>{txt}</span>
    </div>
  )
}

export default OutSideErrorModal