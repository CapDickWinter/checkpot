import React, { createContext, useContext } from 'react';
import { useWalletStore } from '../../store/walletStore';

interface AuthContextType {
  address: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  address: null,
  loading: false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { address, isConnecting } = useWalletStore();

  return (
    <AuthContext.Provider value={{ address, loading: isConnecting }}>
      {children}
    </AuthContext.Provider>
  );
};