import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function PrivateRoute({children}) {
  const {user} = useAuth()
  const location = useLocation()

  if (user) {
    return <>{children}</>
  }
  return <Navigate to={'/login'} state={{pathname: location.pathname}} replace={true} />
}

export default PrivateRoute;