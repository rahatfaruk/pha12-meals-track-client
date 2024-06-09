import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUserFromDb from "../hooks/useUserFromDb";
import Loading from "./Loading";

function AdminRoute({children}) {
  const {user} = useAuth()
  const location = useLocation()

  // if user is empty, navigate 
  if (!user) { 
    return <Navigate to={'/login'} state={{pathname: location.pathname}} replace={true} /> 
  }

  // user is availabe, now check for user from db
  const {userData, isPending} = useUserFromDb()

  if (isPending) {
    return <Loading />
  } else if (userData?.rank === 'admin') { 
    return <>{children}</> 
  }
  return <Navigate to={'/login'} state={{pathname: location.pathname}} replace={true} />
}

export default AdminRoute;