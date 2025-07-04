import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../types/user";
import { getMyProfile } from "../api/profile";
import {
  getAccessToken,
  removeAccessToken,
  removeRefreshToken,
} from "../utils/token"; // helper로 분리해뒀다면 import

type AuthContextType = {
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: () => {},
  logout: () => {},
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAccessToken(); // localStorage or sessionStorage 둘 다 체크
    if (token) {
      // getMyProfile에서 자동으로 커스텀 axios 사용 & 인터셉터 적용
      getMyProfile()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => {
          // accessToken/refreshToken이 모두 만료 or 비정상일 때
          removeAccessToken();
          removeRefreshToken();
          setCurrentUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = (user: User) => {
    setCurrentUser(user);
  };

  const logout = () => {
    removeAccessToken();
    removeRefreshToken();
    setCurrentUser(null);
    // 필요시 window.location.href = "/login";
  };

  if (loading) return null; // 또는 <LoadingSpinner />

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};