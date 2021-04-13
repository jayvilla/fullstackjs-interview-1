import React from 'react';

export type Pagination = {
  currentPage: number;
  increment?(): void;
  decrement?(): void;
  setPage(pageNumber: number): any;
};

export const PaginationContext = React.createContext<Partial<Pagination>>(null);
