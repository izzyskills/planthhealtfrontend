import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
import { useAuth } from "~/context/AuthContext";

const RequireAuth = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  console.log("RequireAuth", location);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: location } });
    }
  }, [isLoggedIn, navigate, location]);
  return <Outlet />;
};
export default RequireAuth;
