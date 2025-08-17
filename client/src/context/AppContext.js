import { useContext , createContext } from 'react';

// import { AppContext } from './AppContext';
export const AppContext = createContext()

export const useAppContext = () => {
    return useContext(AppContext);
};
