import { NavLink } from "react-router-dom";

function NavbarLink({ link }) {
  return (
    <li>
      <NavLink to={link.path} end className={({ isActive }) =>`
        block px-4 py-2 rounded-md hover:underline hover:bg-orange-100 dark:text-white dark:hover:bg-orange-700 
        ${isActive ? 'text-orange-600 bg-orange-100 font-bold underline dark:bg-orange-600' : ''}
      `}>{link.text}</NavLink>
    </li>
  );
}

export default NavbarLink