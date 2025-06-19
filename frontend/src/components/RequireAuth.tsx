import { useAuth } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
  children: JSX.Element;
};

export default function RequireAuth({ children }: Props) {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}