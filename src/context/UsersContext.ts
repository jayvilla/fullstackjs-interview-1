import { User } from '@src/components/users/types';
import React from 'react';

export interface Users {
  searchValue: string;
  setSearchValue?(value: string): any;
  searchColumns: string[];
  setSearchColumns(any): any;
  handleSort?(columnName: string): any;
  columnToSort: string;
  sortDirection: string;
  fetchUsers(): any;
  currentUsers: User[];
  currentPage: number;
  paginate(pageNumber: number): void;
  loading: boolean;
  totalPages: number;
}

export const UsersContext = React.createContext<Partial<Users>>(null);
