import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

function useAuth() {
  const userInfo = useContext(AuthContext)
  return userInfo
}

export default useAuth;