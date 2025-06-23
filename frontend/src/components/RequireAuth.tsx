import { useAuth } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
  children: JSX.Element;
};

export default function RequireAuth({ children }: Props) {
  const { currentUser, loading } = useAuth(); // loading 상태도 가져옴
  const location = useLocation();

  if (loading) {
    // 인증 체크 중에는 아무 것도 렌더링하지 않음 (또는 스피너)
    return null; // 또는 <LoadingSpinner /> 넣어도 됨
  }

  if (!currentUser) {
    // 인증 체크 끝났는데 유저 없음 → 로그인 페이지로 리다이렉트
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 인증 통과 → children(보호된 라우트) 렌더링
  return children;
}