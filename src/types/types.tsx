import { ReactNode } from 'react';

export interface User {
  bank: {
    cardType: string;
    cardNumber: string ;
  };
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  gender: 'male' | 'female';
  image: string;
  username: string;
  company: {
    title: ReactNode;
    name: string;
    department: string;
  };
  address: {
    stateCode: ReactNode;
    address: unknown;
    city: string;
    country: string;
  };
  role: string;
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface TableParams {
  page: number;
  pageSize: number;
  searchQuery: string;
}
export interface SearchProps {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}

export type Props = {
  children: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
};

export type State = {
  hasError: boolean;
};
