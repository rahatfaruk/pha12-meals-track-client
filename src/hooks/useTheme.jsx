import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";

function useTheme() {
  const themeObj = useContext(ThemeContext)
  return themeObj
}

export default useTheme;