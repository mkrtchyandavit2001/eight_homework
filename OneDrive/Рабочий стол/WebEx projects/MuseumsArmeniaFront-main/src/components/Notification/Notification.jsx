import React, { useEffect, useState } from 'react'
import './Notification.css'
import { useDispatch, useSelector } from 'react-redux'
import { getNotification } from '../../store/slices/ProfilePageSlice/ProfilePageApi'
import { selectNotification } from '../../store/slices/ProfilePageSlice/ProfilePageSlice'
import { leftPaginationIcon, rightArowIcon, rightPaginationIcon } from '../../iconFolder/icon'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LoadSpinner from '../LoadSpinner/LoadSpinner'

function Notification() {
    const { t, i18n } = useTranslation()
    const [page, setPage] = useState({ i: 1 })

    const dispatch = useDispatch()
    const respNotification = useSelector(selectNotification)
    const navigate = useNavigate()
    const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';

    useEffect(() => {
        dispatch(getNotification(page.i))
    }, [page, dispatch])


    const pagination = () => {
        if (respNotification.params && typeof respNotification.params.page_count !== 'undefined') {
            const paginationList = [];
            for (let i = 1; i <= respNotification.params.page_count; i++) {
                paginationList.push(<li key={i} onClick={() => setPage({ i })} style={{ color: i === page.i ? 'var(--second_font_color)' : 'black' }} >{i}</li>);
            }
            return paginationList;
        }
        else {
            return <LoadSpinner />
        }
    }

    return (
        <div className='notification_page'>
            <div className='container'>
                <h3 className='notification_page_title'>{t('profil_side_bar.4')}</h3>
                {respNotification.data?.length > 0 ? (<div className='notification_page_items'>
                    {
                        respNotification && respNotification.data.map(not => (
                            <div key={not.id} className='notification_page_item' onClick={() => navigate(`/${leng}/events/${not.event_id}`)}>
                                <div className='notification_page_item_img_div'>
                                    <img src={not?.image?.path} alt={not.event_name} />
                                    <span>{not.event_name}</span>
                                </div>
                                <span>{rightArowIcon}</span>
                            </div>
                        ))
                    }
                </div>) : (<h3 style={{ fontWeight: '100' }}>{t('single_shop_page.3')}</h3>)}

                {respNotification?.params?.page_count > 1 && <ul className='pagination_ul'>
                    <li onClick={() => page.i > 1 && setPage({ i: page.i - 1 })}>{leftPaginationIcon}</li>

                    {
                        pagination()
                    }
                    <li onClick={() => respNotification?.params?.page_count > page.i && setPage({ i: page.i + 1 })}>{rightPaginationIcon}</li>
                </ul>}
            </div>


        </div>
    )
}

export default Notification