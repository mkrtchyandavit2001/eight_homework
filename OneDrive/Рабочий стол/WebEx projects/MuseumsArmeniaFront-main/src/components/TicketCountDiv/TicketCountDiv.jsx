import React, { useEffect, useState } from 'react';
import { MinusButtonIcons, PlusButtonIcons } from '../../iconFolder/icon';
import { useLocation } from 'react-router-dom';

function TicketCountDiv({ max, min, price, setFullValueTicket, quantityEvent, setQuantityEvent, item, type, updateTotalValue }) {
  const [ticketCountSub, setTicketCountSub] = useState(0);
  const { pathname } = useLocation();
  const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';
  console.log(max);
  console.log(item,8899);
  
  const handleClick = (op) => {
    let newTicketCountSub = ticketCountSub;

    if (op === '-') {
      newTicketCountSub = Math.max(min, ticketCountSub - 1);
    } else {
      newTicketCountSub = Math.min(max, ticketCountSub + 1);
    }

    setTicketCountSub(newTicketCountSub);
  };

  useEffect(() => {
    // Notify the parent component of the change in ticket count and value
    updateTotalValue(item.id + type, ticketCountSub * price);

    sessionStorage.setItem(`quantity${item.id + type}`, ticketCountSub);
  }, [ticketCountSub]);

  return (
    <div className='Events_ticket_price'>
      {pathname === `/${leng}/` && <p>{price} AMD</p>}
      <div className='packet_div_count'>
        <span data-type={type} id='minus' onClick={() => handleClick('-')}><MinusButtonIcons width='25' height='25' /></span>
        <span style={{ color: ticketCountSub > 0 ? 'black' : 'gray' }} className='packet_result' id='result'>{ticketCountSub}</span>
        <span data-type={type} id='plus' onClick={() => handleClick('+')}><PlusButtonIcons width='25' height='25' /></span>
      </div>
    </div>
  );
}

export default TicketCountDiv;
