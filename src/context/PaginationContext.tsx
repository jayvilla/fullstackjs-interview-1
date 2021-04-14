import React from 'react';
import { PaginationProviderContext } from './types';

export const PaginationContext = React.createContext<Partial<PaginationProviderContext>>(null);
