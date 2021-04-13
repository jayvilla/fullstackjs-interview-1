import { User } from '@src/components/users/types';
import React from 'react';

export type Users = {
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
  users: User[];
  search(users: User[]): any;
};

export const UsersContext = React.createContext<Partial<Users>>(null);
