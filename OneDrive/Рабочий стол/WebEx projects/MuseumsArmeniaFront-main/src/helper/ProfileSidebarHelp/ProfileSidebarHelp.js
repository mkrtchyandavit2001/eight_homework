import MyAccount from '../../images/MyAccount.svg';
import Chat from '../../images/Chat.svg';
import OrderHistory from '../../images/OrderHistory.svg';
import QrCode from '../../images/QrCode.svg';
import Card from '../../images/Card.svg';
import Notificationn from '../../images/Notificationn.svg';
import { chatIcon, donateIcon, myAccountIcon, notficationIcon, orderHistoryIcon, qrCodeIcon } from '../../iconFolder/icon';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

export const ProfileSidebarArrll = () => {
  const { t } = useTranslation();

  return [
    {
      icon: myAccountIcon,
      name: t('profil_side_bar.0'),
      slug: 'myaccount',
    },
    {
      icon: chatIcon,
      name: t('profil_side_bar.1'),
      slug: 'chat',
    },
    {
      icon: orderHistoryIcon,
      name: t('profil_side_bar.2'),
      slug: 'orderhistory',
    },
    {
      icon: qrCodeIcon,
      name: t('profil_side_bar.3'),
      slug: 'qrcode',
    },
    // {
    //   icon: Card,
    //   name: 'Card',
    //   slug: 'card',
    // },
    {
      icon: notficationIcon,
      name: t('profil_side_bar.4'),
      slug: 'notification',
    },

    {
      icon: donateIcon,
      name: t('profil_side_bar.5'),
      slug: 'donations',
    }
  ];
};


export function downloadImage(path) {
  axios({
      url: path,
      method: 'GET',
      responseType: 'blob'
  })
      .then((response) => {
          const url = window.URL
              .createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'image.jpg');
          document.body.appendChild(link);
          link.click();
      })
}

  

