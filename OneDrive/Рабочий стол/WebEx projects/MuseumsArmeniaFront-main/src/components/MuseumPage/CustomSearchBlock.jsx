import React, { memo } from 'react';
import { DownIcon } from '../../iconFolder/icon';
import { useTranslation } from 'react-i18next';

const CustomSearshBlock = ({
   fun = () => {},
   activ = '',
   setActiv = () => {},
   arr = [],
   Icon = () => {},
   Icon1 = () => {},
   translationtxt = [],
}) => {
   const { t, i18n } = useTranslation();
   const [openList, setOpenList] = React.useState(false);

   return (
      <div className="searchBlock" onClick={() => setOpenList(!openList)}>
         <h4>{activ.name}</h4>
         <DownIcon />

         <div
            className="parent_listRegion"
            style={{
               transform: `rotateX(${openList ? '0deg' : '90deg'})`,
               transformOrigin: 'top',
            }}>
            <p
               className="searchOll"
               onClick={() =>
                  fun({
                     name: translationtxt.length ? t(`${translationtxt[0]}`) : '',
                     type: null,
                     id: null,
                  })
               }
               style={{
                  backgroundColor: `${activ.type === null ? '#F6F5F5' : ''}`,
               }}>
               <Icon width={15} height={15} fill={'#3F3D56'} />
               {translationtxt.length ? t(`${translationtxt[1]}`) : ''}
            </p>
            <div className="listRegion">
               {arr.map((el, idx) => (
                  <div
                     key={idx}
                     onClick={() => setOpenList(false)}
                     className="listRegion_p"
                     style={{
                        backgroundColor: `${activ.type === el.key ? '#F6F5F5' : ''}`,
                     }}>
                     <p onClick={() => fun({ name: t(`${el.key}`), type: el.key, id: el.id })}>
                        <Icon width={15} height={15} fill={'#3F3D56'} />
                        {t(`${el.key}`)}
                     </p>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default memo(CustomSearshBlock);
