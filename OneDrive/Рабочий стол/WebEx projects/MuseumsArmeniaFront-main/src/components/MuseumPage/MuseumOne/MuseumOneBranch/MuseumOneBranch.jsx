import React from 'react';

import { MuseumOneBranchList } from '../../index';
import { useTranslation } from 'react-i18next';

const MuseumOneBranch = ({ branches }) => {
   const [t, i18n] = useTranslation();
   return (
      <div className="museumOne_pageStyle">
         <div className="museumOneBranch-par">
            <h4 className="museumOne_title">{t(`museumBranch`)}</h4>
            <div className="MuseumOneBranch-parList">
               {branches.map((item) => (
                  <MuseumOneBranchList key={item.id} {...item} />
               ))}
            </div>
         </div>
      </div>
   );
};

export default React.memo(MuseumOneBranch);
