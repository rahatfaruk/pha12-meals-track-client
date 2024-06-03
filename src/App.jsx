import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Navbar from "./comps/Navbar";
import Footer from "./comps/Footer";

export const maxContent = 'max-w-screen-xl mx-auto'

function App() {
  return (  
    <div>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
      <ToastContainer position="top-center" theme="colored" />
    </div>
  );
}

export default App;