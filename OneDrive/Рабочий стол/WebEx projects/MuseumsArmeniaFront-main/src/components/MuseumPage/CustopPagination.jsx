import React from 'react';

import ReactPaginate from 'react-paginate';

const CustopPagination = ({ pageCount = 0, onChangePag = () => {}, allpageCount }) => {
   return (
      <ReactPaginate
         className={'CustopPagination'}
         breakLabel="..."
         nextLabel=">"
         onPageChange={(e) => onChangePag(e.selected + 1)}
         pageRangeDisplayed={5}
         pageCount={allpageCount}
         forcePage={pageCount - 1}
         previousLabel="<"
         renderOnZeroPageCount={null}
      />
   );
};

export default React.memo(CustopPagination);
