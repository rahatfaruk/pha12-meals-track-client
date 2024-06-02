import { Outlet } from "react-router-dom";
import Navbar from "./comps/Navbar";

function App() {
  return (  
    <div>
      <div className="flex flex-col">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default App;