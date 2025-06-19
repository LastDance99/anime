import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../types/user";
import { getMyProfile } from "../api/profile";
import axios from "../lib/axios";

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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      getMyProfile()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => {
          console.warn("❌ 자동 로그인 실패", err);
          localStorage.removeItem("accessToken");
          setCurrentUser(null);
        })
        .finally(() => {
          setLoading(false); // ✅ 이제 정확히 실행됨
        });
    } else {
      setLoading(false); // 토큰 없을 때도 풀어줘야 함
    }
  }, []);

  const login = (user: User) => {
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem("accessToken"); // ✅ 키 통일
    setCurrentUser(null);
  };

  if (loading) return null; // ✅ 로그인 확인 중엔 아무것도 안 보여줌

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};