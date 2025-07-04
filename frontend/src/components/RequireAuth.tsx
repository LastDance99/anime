import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";

type Props = {
  children: JSX.Element;
};

export default function RequireAuth({ children }: Props) {
  const { currentUser, loading } = useAuth();
  const location = useLocation();
  const { i18n } = useTranslation();

  // ✅ 유저 언어 설정
  useEffect(() => {
    if (currentUser?.language && i18n.language !== currentUser.language) {
      i18n.changeLanguage(currentUser.language);
    }
  }, [currentUser?.language, i18n]);

  if (loading) {
    return null; // 또는 <LoadingSpinner />
  }

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}