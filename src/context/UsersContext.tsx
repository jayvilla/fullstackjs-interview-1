import { User } from '@src/components/users/types';
import React from 'react';

export type UsersProviderContext = {
  users: User[];
  currentUsers: User[];
  loading: boolean;
  currentPage: number;
  usersPerPage: number;
  columnToSort: string;
  sortDirection: string;
  searchColumns: string[];
  filteredUsers: User[];
  setUsers(users: User[]): void;
  setLoading(loading: boolean): void;
  setCurrentPage(page: number): void;
  setUsersPerPage(usersPerPage: number): void;
  setColumnToSort(columnToSort: string): any;
  setSortDirection(sortDirection: string): void;
  setSearchColumns(any): any;
  setFilteredUsers(users: User[]): void;
};

export const initialState: UsersProviderContext = {
  users: null,
  currentUsers: null,
  loading: false,
  currentPage: 1,
  usersPerPage: 13,
  columnToSort: '',
  sortDirection: 'desc',
  searchColumns: ['firstName', 'lastName'],
  filteredUsers: null,
  setUsers: (users: User[]) => {},
  setLoading: (loading: boolean) => {},
  setCurrentPage: (page: number) => {},
  setUsersPerPage: (usersPerPage: number) => {},
  setColumnToSort: (columnToSort: string) => {},
  setSortDirection: (sortDirection: string) => {},
  setSearchColumns: (searchColumns: string[]) => {},
  setFilteredUsers: (users: User[]) => {},
};

export type UsersProviderValues = {
  children: React.ReactElement;
  initialState?: UsersProviderContext;
};

export const UsersContext = React.createContext<Partial<UsersProviderContext>>(initialState);

export const UsersProvider = ({ children, initialState }: UsersProviderValues) => {
  const [state, setState] = React.useState({
    users: initialState?.users,
    currentUsers: initialState?.currentUsers,
    loading: initialState?.loading,
    currentPage: initialState?.currentPage,
    usersPerPage: initialState?.usersPerPage,
    columnToSort: initialState?.columnToSort,
    sortDirection: initialState?.sortDirection,
    searchColumns: initialState?.searchColumns,
    filteredUsers: initialState?.filteredUsers,

    setUsers: (users: User[]) => setState((prevState) => ({ ...prevState, users })),
    setLoading: (loading: boolean) => setState((prevState) => ({ ...prevState, loading })),
    setCurrentPage: (page: number) =>
      setState((prevState) => ({ ...prevState, currentPage: page })),
    setUsersPerPage: (usersPerPage: number) =>
      setState((prevState) => ({ ...prevState, usersPerPage })),
    setColumnToSort: (columnToSort: string) =>
      setState((prevState) => ({ ...prevState, columnToSort })),
    setSortDirection: (sortDirection: string) =>
      setState((prevState) => ({ ...prevState, sortDirection })),
    setSearchColumns: (searchColumns: string[]) =>
      setState((prevState) => ({ ...prevState, searchColumns })),
    setFilteredUsers: (users: User[]) =>
      setState((prevState) => ({ ...prevState, filteredUsers: users })),
  });

  return <UsersContext.Provider value={state}>{children}</UsersContext.Provider>;
};

// import { AgentRecoSet, ExcludeFunctionProps, PartnerRecoSet } from '@src/types';
// import React from 'react';

// export interface IRecoContext {
//   buyerAgentReco: AgentRecoSet;
//   buyerPartnerReco: PartnerRecoSet;
//   sellerAgentReco: AgentRecoSet;
//   sellerPartnerReco: PartnerRecoSet;
//   setBuyerAgentReco: (reco: AgentRecoSet) => void;
//   setBuyerPartnerReco: (reco: PartnerRecoSet) => void;
//   setSellerAgentReco: (reco: AgentRecoSet) => void;
//   setSellerPartnerReco: (reco: PartnerRecoSet) => void;
//   setState: (newState: ExcludeFunctionProps<Partial<IRecoContext>>) => void;
// }

// export const defaultValue: IRecoContext = {
//   buyerAgentReco: null,
//   buyerPartnerReco: null,
//   sellerAgentReco: null,
//   sellerPartnerReco: null,
//   setBuyerAgentReco: (reco: AgentRecoSet) => {},
//   setBuyerPartnerReco: (reco: PartnerRecoSet) => {},
//   setSellerAgentReco: (reco: AgentRecoSet) => {},
//   setSellerPartnerReco: (reco: PartnerRecoSet) => {},
//   setState: (newState: ExcludeFunctionProps<Partial<IRecoContext>>) => {},
// };

// export const RecoContext = React.createContext(defaultValue);

// export type RecoProviderValue = {
//   children: React.ReactElement;
//   initialRecos: {
//     buyerAgentReco?: AgentRecoSet;
//     buyerPartnerReco?: PartnerRecoSet;
//     sellerAgentReco?: AgentRecoSet;
//     sellerPartnerReco?: PartnerRecoSet;
//   };
// };

// export const RecoProvider = ({ children, initialRecos }: RecoProviderValue) => {
//   const [state, setState] = React.useState<IRecoContext>({
//     buyerAgentReco: initialRecos?.buyerAgentReco,
//     buyerPartnerReco: initialRecos?.buyerPartnerReco,
//     sellerAgentReco: initialRecos?.sellerAgentReco,
//     sellerPartnerReco: initialRecos?.sellerPartnerReco,

//     setBuyerAgentReco: (reco: AgentRecoSet) =>
//       setState((prevState) => ({ ...prevState, buyerAgentReco: reco })),
//     setBuyerPartnerReco: (reco: PartnerRecoSet) =>
//       setState((prevState) => ({ ...prevState, buyerPartnerReco: reco })),
//     setSellerAgentReco: (reco: AgentRecoSet) =>
//       setState((prevState) => ({ ...prevState, sellerAgentReco: reco })),
//     setSellerPartnerReco: (reco: PartnerRecoSet) =>
//       setState((prevState) => ({ ...prevState, sellerPartnerReco: reco })),

//     setState: (newState: ExcludeFunctionProps<Partial<IRecoContext>>) =>
//       setState((prevState) => ({ ...prevState, ...newState })),
//   });

//   return <RecoContext.Provider value={state}>{children}</RecoContext.Provider>;
// };
