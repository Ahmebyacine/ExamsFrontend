import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <nav className="flex items-center justify-center space-x-1" aria-label="Pagination">
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </PaginationButton>

      {pageNumbers.map((pageNumber, index) => (
        <PaginationItem
          key={index}
          pageNumber={pageNumber}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      ))}

      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </PaginationButton>
    </nav>
  );
}

function PaginationItem({ pageNumber, currentPage, onPageChange }) {
  if (pageNumber === '...') {
    return <span className="px-3 py-2">...</span>;
  }

  const isCurrentPage = currentPage === pageNumber;

  return (
    <PaginationButton
      onClick={() => onPageChange(pageNumber)}
      aria-current={isCurrentPage ? 'page' : undefined}
      className={`${
        isCurrentPage
          ? 'bg-primary text-primary-foreground font-semibold'
          : 'text-foreground/60 hover:text-foreground'
      }`}
    >
      {pageNumber}
    </PaginationButton>
  );
}

function PaginationButton({ children, className = '', ...props }) {
  return (
    <button
      type="button"
      className={`min-w-[2rem] px-3 py-2 text-sm rounded-md transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function getPageNumbers(currentPage, totalPages) {
  const pageNumbers = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= 3) {
      pageNumbers.push(1, 2, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
  }

  return pageNumbers;
}