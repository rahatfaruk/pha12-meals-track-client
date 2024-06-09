import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";
import { maxContent } from "../App";

export const dashboardBodyClass = 'px-4 py-10 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto'

function DashboardAdmin() {
  return (  
    <div className={`flex-1 px-4 dark:bg-gray-900 dark:text-white`}>
      <div className={`${maxContent} py-4 grid md:grid-cols-[25%_1fr] lg:grid-cols-[20%_1fr] gap-4`}>
        <SideNav />
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardAdmin;