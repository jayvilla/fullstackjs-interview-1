import React from 'react';

export interface Pagination {
  currentPage: number;
  increment?(): void;
  decrement?(): void;
  setPage(pageNumber: number): any;
}

export const PaginationContext = React.createContext<Partial<Pagination>>(null);
