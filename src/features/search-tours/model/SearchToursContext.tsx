import {createContext, type ReactNode, useContext} from 'react';
import {useTourSearchInternal} from './useTourSearchInternal';

type SearchContextType = ReturnType<typeof useTourSearchInternal>;

const SearchToursContext = createContext<SearchContextType | null>(null);

export const SearchToursProvider = ({children}: { children: ReactNode }) => {

  const searchApi = useTourSearchInternal();

  return (
    <SearchToursContext.Provider value={searchApi}>
      {children}
    </SearchToursContext.Provider>
  );
};

export const useSearchTours = () => {
  const context = useContext(SearchToursContext);
  if (!context) throw new Error('useSearchTours must be used within Provider');
  return context;
};