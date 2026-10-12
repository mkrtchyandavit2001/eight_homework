import React from 'react';

import './museumOneBranch.css';
import { Link } from 'react-router-dom';

const MuseumOneBranchList = ({ address, working_days, email, phone_number, photo, name, id }) => {
   return (
      <Link to={`branch/${id}`}>
         <div className="museumOneBranchList-par">
            <div
               className="museumOneBranchList-parImg"
               style={{ backgroundImage: `url(${photo})` }}>
               {/* <img src={photo} alt="photo museums" /> */}
            </div>
            <div className="museumOneBranchList-parDesc">
               <p>{name.slice(0, 30)}</p>
               <div className="parDesc-info">
                  <ul className="parDesc-infoList">
                     <li>{address}</li>
                     <li>{working_days}</li>
                     <li>{email}</li>
                     <li>
                        {phone_number.map((el, idx) => (
                           <span key={idx}>{el},</span>
                        ))}
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </Link>
   );
};

export default React.memo(MuseumOneBranchList);
