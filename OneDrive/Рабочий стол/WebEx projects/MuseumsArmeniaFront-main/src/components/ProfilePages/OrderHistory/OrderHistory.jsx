import React, { useEffect, useRef, useState } from 'react';
import './OrderHistory.css';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../../store/slices/ProfilePageSlice/ProfilePageApi';
import { useTranslation } from 'react-i18next';
import { selectOrders, selectSideBar } from '../../../store/slices/ProfilePageSlice/ProfilePageSlice';
import { leftPaginationIcon, rightPaginationIcon } from '../../../iconFolder/icon';
import LoadSpinner from '../../LoadSpinner/LoadSpinner';

function OrderHistory() {
  const { t, i18n } = useTranslation()

  const dispatch = useDispatch()
  const respOreders = useSelector(selectOrders)
  const ticketsType_for_private = t('ticketsType_for_private', { returnObjects: true })
  const respSideBar = useSelector(selectSideBar)
  const orderRef = useRef(null)
  const [page, setPage] = useState({ i: 1 })


  useEffect(() => {
    dispatch(getOrders(page.i))
  }, [dispatch, page])




  const pagination = () => {
    if (respOreders.params && typeof respOreders.params.page_count !== 'undefined') {
      const paginationList = [];
      for (let i = 1; i <= respOreders.params.page_count; i++) {
        paginationList.push(<li key={i} onClick={() => setPage({ i })} style={{ color: i === page.i ? 'var(--second_font_color)' : 'black' }} >{i}</li>);
      }
      return paginationList;
    }
    else {
      return <LoadSpinner />
    }
  }
  return (
    <>
      <div className='container'>
        <div ref={orderRef} className="OrderHistory_all" >
          <p style={{ fontWeight: '700' }}>{t('order_history.9')}</p>
          {respOreders.data ? (<div className="OrderHistory_table">
            <table>
              <thead>
                <tr>
                  <th>{t('order_history.0')}</th>
                  <th>{t('order_history.1')}</th>
                  <th>{t('order_history.2')}</th>
                  <th>{t('order_history.3')}</th>
                  <th>{t('order_history.4')}</th>
                  <th>{t('order_history.5')}</th>
                  <th>{t('order_history.6')}</th>
                </tr>
              </thead>
              <tbody>
                {
                  respOreders.data && respOreders?.data.map((order) => (
                    <tr key={order.id}>
                      <td>{order.order_id}</td>
                      <td >
                        {
                          order?.museum_name.map((museum, index) => (
                            <p key={index}>{museum}</p>
                          ))
                        }
                      </td>
                      <td>
                        {
                          ticketsType_for_private.map(ticket => {
                            if (Object.keys(ticket)[0] === order.type) {
                              return <span key={order.id}>{Object.values(ticket)[0]}  {order.product_name && ('/ ' + order.product_name)}</span>
                            }
                            else if (order.type === 'event-config' && Object.keys(ticket)[0] === 'event_config') {
                              return <span key={order.id}>{Object.values(ticket)[0]} {order.product_name && '/ ' + order.product_name}</span>
                           }
                          })
                        }
                      </td>
                      <td>{order.quantity}</td>
                      <td>{order.date}</td>
                      <td>{order.total_price} AMD</td>
                      <td>
                        <span style={{ backgroundColor: order.status === 'pending' ? '#FEEAEA' : '#E5FFE8', color: order.status === 'pending' ? 'red' : 'green', padding: '2px 8px', borderRadius: '5px' }}>
                          {order.status === 'pending' ? t('order_history.7') : t('order_history.8')}
                        </span>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>

            {respOreders?.params?.page_count > 1 && <ul className='pagination_ul'>
              <li onClick={() => page.i > 1 && setPage({ i: page.i - 1 })}>{leftPaginationIcon}</li>

              {
                pagination()
              }
              <li onClick={() => respOreders?.params?.page_count > page.i && setPage({ i: page.i + 1 })}>{rightPaginationIcon}</li>
            </ul>}

          </div>) : <h3 style={{ fontWeight: '100' }}>{t('single_shop_page.3')}</h3>}
        </div>
      </div>

    </>
  );
}

export default OrderHistory;
