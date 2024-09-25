import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/Auth/useContextAuth";
type PropsType = {
  children: React.ReactNode;
};
function ProtectedRoute({ children }: PropsType) {
  const { isAuthenticated } = useAuth();
  const naviagate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      naviagate("/login");
    } //AUTHENTICATON
  }, [isAuthenticated, naviagate]);

  return isAuthenticated ? children : null;
}
export default ProtectedRoute;
