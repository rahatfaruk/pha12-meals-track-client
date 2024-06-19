import { Navigate, useLocation } from "react-router-dom";
import useUserFromDb from "../hooks/useUserFromDb";
import Loading from "./Loading";

function AdminRoute({children}) {
  const {userData, isPending} = useUserFromDb()
  const location = useLocation()

  if (isPending) { return <Loading /> }
  if (userData?.rank === 'admin') { return <>{children}</> }
  return <Navigate to={'/login'} state={{pathname: location.pathname}} replace={true} />
}

export default AdminRoute;