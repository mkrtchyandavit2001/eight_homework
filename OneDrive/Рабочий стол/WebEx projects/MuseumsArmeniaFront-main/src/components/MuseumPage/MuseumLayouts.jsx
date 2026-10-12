import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';

const MuseumLayouts = () => {
   return (
      <>
         <Outlet />
      </>
   );
};

export default memo(MuseumLayouts);
