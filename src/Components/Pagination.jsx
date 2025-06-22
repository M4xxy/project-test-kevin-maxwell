import React from 'react';
import { usePagination, DOTS } from '../Hooks/usePagination';
import styles from './Pagination.module.css'; 

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  const paginationRange = usePagination({
    currentPage,
    totalPages,
    siblingCount: 1
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const handlePageClick = (page) => {
    if (page !== DOTS) {
      onPageChange(page);
    }
  };
  
  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <nav className={styles.container} aria-label="Pagination">
      {/* Tombol Previous (<) */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.button}
      >
        &lt;
      </button>

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <span key={`dots-${index}`} className={styles.dots}>&#8230;</span>;
        }

        const buttonClasses = `${styles.button} ${currentPage === pageNumber ? styles.activeButton : ''}`;

        return (
          <button
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className={buttonClasses}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Tombol Next (>) */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
        className={styles.button}
      >
        &gt;
      </button>
    </nav>
  );
};

export default Pagination;