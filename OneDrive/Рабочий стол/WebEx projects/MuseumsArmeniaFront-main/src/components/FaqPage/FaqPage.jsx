import React from 'react'
import './FaqPage.css'
import { useTranslation } from 'react-i18next'
import { faqFreeTicket, faqFreeTicket_2, faqIcon } from '../../iconFolder/icon'

function FaqPage() {
    const {t, i18n} = useTranslation()

    const faqData = [
        {
            id: '1',
            title: t('faqUserRequestsData.0'),
            txt: t('faqUserRequestsData.1')
        },

        {
            id: '2',
            title: t('faqUserRequestsData.2'),
            txt: t('faqUserRequestsData.3')
        },

        {
            id: '3',
            title: t('faqUserRequestsData.4'),
            txt: t('faqUserRequestsData.5')
        },

        {
            id: '4',
            title: t('faqUserRequestsData.6'),
            txt: t('faqUserRequestsData.7')
        },

        {
            id: '5',
            title: t('faqUserRequestsData.8'),
            txt: t('faqUserRequestsData.9')
        },
    ]
  return (
    <div className='faq_page'>
        <div className='container'>
            <div className='faq_page_block'>

                <div className='faq_page_block_title'>
                    <div className='lines_div'>
                        <img className='border_1' src={require('../../images/Line 106.png')} alt="" />
                        <h2>{t('faqTitle')}</h2>
                        <img className='border_2' src={require('../../images/Line 106.png')} alt="" />
                    </div>
                </div>

                <div className='faq_page_block_info'>
                    <div className='faq_page_block_info_top'>
                        {
                            faqData.map(el =>
                                <div key={el.id} className='faq_page_block_info_top_item'>
                                    <div className='faq_page_block_info_top_item_title'>
                                        <span>{faqIcon}</span>
                                        <p>{el.title}</p>
                                    </div>
                                    <p className='faq_page_block_info_top_item_txt'>{el.txt}</p>
                                </div>
                            )
                        }
                    </div>


                    <div className='faq_page_block_info_botom'>
                        <div className='faq_page_block_info_botom_left'>
                            <div className='faq_page_block_info_botom_left_title'>
                                <span>{faqFreeTicket}</span>
                                <span>{t('faq_free_tickets_title')}</span>
                            </div>

                            <ul className='faq_page_block_info_botom_left_text_list'>
                                <li>{t('faq_free_tickets.0')}</li>
                                <li>{t('faq_free_tickets.1')}</li>
                                <li>{t('faq_free_tickets.2')}</li>
                                <li>{t('faq_free_tickets.3')}</li>
                                <li>{t('faq_free_tickets.4')}</li>
                                <li>{t('faq_free_tickets.5')}</li>
                                <li>{t('faq_free_tickets.6')}</li>
                                <li>{t('faq_free_tickets.7')}</li>
                                <li>{t('faq_free_tickets.8')}</li>
                                <li>{t('faq_free_tickets.9')}</li>
                                <li>{t('faq_free_tickets.10')}</li>
                                <li>{t('faq_free_tickets.11')}</li>
                                <li>{t('faq_free_tickets.12')}</li>
                                
                            </ul>
                        </div>
                        <div className='faq_page_block_info_botom_right'>

                            <div className='faq_page_block_info_botom_right_title'>
                                <span>{faqFreeTicket_2}</span>
                                <span>{t('faq_sale_tickets_title')}</span>
                            </div>

                            <div className='faq_page_block_info_botom_right_text'>
                                <p>{t('faq_sale_tickets.0')}</p>
                                <ul className='faq_page_block_info_botom_right_text_list'>
                                    <li>{t('faq_sale_tickets.1')}</li>
                                    <li>{t('faq_sale_tickets.2')}</li>
                                    <li>{t('faq_sale_tickets.3')}</li>
                                    <li>{t('faq_sale_tickets.4')}</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FaqPage