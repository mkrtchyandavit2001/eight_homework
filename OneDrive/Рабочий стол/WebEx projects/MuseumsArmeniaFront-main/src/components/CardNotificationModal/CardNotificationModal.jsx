import React from 'react'
import './CardNotificationModal.css'

function CardNotificationModal({message}) {
  return (
    <div className='notification_modal_card'>
            {message}
    </div>
  )
}

export default CardNotificationModal