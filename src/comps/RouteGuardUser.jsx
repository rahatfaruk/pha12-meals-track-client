import { useNavigate, Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function RouteGuardUser({children}) {
  const {user} = useAuth()
  const location = useLocation()

  if (user) {
    return <div>{children}</div>
  }
  return <Navigate to={'/login'} state={{pathname: location.pathname}} replace={true} />
}

export default RouteGuardUser;