import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/userState";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ allowedRoles }) => {
  const user = useRecoilValue(userState);

  if (!user.isAuthenticated) {
    return <Navigate to="/" />;
  }

  //eslint-disable-next-line
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
