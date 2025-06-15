import { createContext, useContext, useState, } from "react";
import type { ReactNode } from "react";
import type { User } from "../types/user";
import { mockUsers } from "../data/userList"; // 추후 삭제 가능

type AuthContextType = {
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // 실제론 localStorage/token 활용하면 됨
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers[0]); // 현재는 mockUsers[0] 로그인된 상태

  const login = (user: User) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};