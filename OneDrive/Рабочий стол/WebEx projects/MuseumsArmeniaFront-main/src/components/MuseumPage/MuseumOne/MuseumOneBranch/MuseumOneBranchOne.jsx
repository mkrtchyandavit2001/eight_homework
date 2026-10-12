import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { postMuseumOnePages } from '../../../../store/slices/MuseumPagesSlice/MuseumPagesApi';
import { CustomSectionTitle, MuseumOneDescription, MuseumOnecontact, IsWrong } from '../../index';
import LoadSpinner from '../../../LoadSpinner/LoadSpinner';
import { GoBackIcons } from '../../../../iconFolder/icon';
const MuseumOneBranchOne = () => {
   const [t, i18n] = useTranslation();
   const { id, branchId } = useParams();
   const { dataMuseumOne, loadingdataMuseumOne } = useSelector((state) => state.museumPages);
   const dispatch = useDispatch();
   const [branch, setBranch] = useState(null);
   const leng = localStorage.getItem('lang') != null ? localStorage.getItem('lang') : 'am';
   useEffect(() => {
      dispatch(postMuseumOnePages({ id }));
   }, [id]);

   useEffect(() => {
      if (dataMuseumOne?.branches?.length) {
         setBranch(dataMuseumOne.branches.find((el) => el.id === +branchId));
      }
   }, [dataMuseumOne]);

   const navigate = useNavigate();

   const goBack = () => {
      navigate(`/${leng}/museums/museum/${id}`);
   };
   return (
      <div className="container">
         {loadingdataMuseumOne === 'loading' ? (
            <LoadSpinner />
         ) : loadingdataMuseumOne === 'fulfilled' && branch ? (
            <div>
               <CustomSectionTitle text={branch.name} />
               <div className="MuseumOneBranchOne-section">
                  <div className="BranchOne-img">
                     <img src={branch.photo} alt="" />
                  </div>
                  <div className="museumOne_parent-section1">
                     <div className="museumOne-blockLeft">
                        <div onClick={goBack} className="goBack">
                           <GoBackIcons />
                           <p className="goBack" onClick={goBack}>
                              {dataMuseumOne.name}
                           </p>
                        </div>
                        <MuseumOneDescription description={branch.description} openBtn={false} />
                     </div>
                     <div className="museumOne-blockRigth ">
                        <MuseumOnecontact
                           {...branch}
                           links={{ web_site: branch.web_site }}
                           phones={branch.phone_number}
                        />
                     </div>
                  </div>
               </div>
            </div>
         ) : (
            <IsWrong text={t(`isWrong.0`)} />
         )}
      </div>
   );
};

export default React.memo(MuseumOneBranchOne);
