import React from 'react';

const IsWrong = ({ text, height = '100vh' }) => {
   return (
      <div
         style={{
            height: height,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '20px 0',
         }}>
         <h3>{text}</h3>
      </div>
   );
};

export default React.memo(IsWrong);
