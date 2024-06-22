import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { toast } from "react-toastify";
import { BellFill, List, MoonStarsFill, SunFill } from "react-bootstrap-icons";
import { maxContent } from "../App";
// comps
import useAuth from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';
import useUserFromDb from '../hooks/useUserFromDb';
import NavbarLink from './NavbarLink';


const navLinks = [
  { id: 1, text: 'Home', path: '/' },
  { id: 2, text: 'Meals', path: '/meals' },
  { id: 3, text: 'Upcoming Meals', path: '/upcoming-meals' },
]

function Navbar() {
  const [showLinks, setShowLinks] = useState(false)
  const { user, logout } = useAuth()
  const { isDarkTheme, onClickThemeToggler } = useTheme()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      toast.info('logged out')
      navigate('/login', {replace:true})
    } catch (err) {
      toast.error('logged out failed', err.message);
    }
  }

  return (
    <nav className="px-4 dark:bg-gray-800">
      <div className={`${maxContent} py-4 border-b grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] gap-4`}>
        <div className="flex gap-2 items-center">
          <figure className="w-8">
            <img src="/logo.svg" className="w-full" />
          </figure>
          <h1 className='text-2xl'><Link to={'/'} className="text-orange-600 font-bold">MealTrack</Link></h1>
        </div>

        {/* profile photo || register,login btn ++ nav-toggler */}
        <div className="flex items-center justify-end md:order-1 gap-4">
          <button onClick={onClickThemeToggler} className="p-1 text-2xl hover:scale-95 dark:text-white">
            {isDarkTheme ? <MoonStarsFill /> : <SunFill />}
          </button>

          {user ?
            <div className="flex gap-2 items-center">
              <div className="relative mr-4">
                <span className="absolute -right-3/4 -top-2/4  inline-block px-1.5 text-sm dark:text-white bg-orange-600 rounded-full">0</span>
                <BellFill className="dark:text-white text-xl" />
              </div>
              <figure className="w-9 p-0.5 border rounded-full border-orange-600" data-tooltip-id="profile-photo">
                <img src={user.photoURL} alt="" className="w-full rounded-full shadow-md" />
              </figure>

              <Tooltip id="profile-photo" clickable openOnClick className="z-50">
                <div className='flex flex-col items-center gap-2'>
                  <p className="text-center text-lg">{user.displayName}</p>
                  <Link to={'/dashboard'} className="px-3 py-1 rounded-md text-white bg-orange-600 hover:opacity-90" onClick={handleLogout}>Dashboard</Link>
                  <button className="px-3 py-1 rounded-md text-white bg-red-800 hover:opacity-90" onClick={handleLogout}>Logout</button>
                </div>
              </Tooltip>
            </div>
            :
            <div className="flex gap-3">
              <Link to='/login' className="inline-block px-3 py-1 rounded-md text-white bg-orange-600 hover:opacity-90">Join Us</Link>
            </div>
          }

          <div className="flex items-center">
            <button className="md:hidden border p-0.5 text-2xl hover:scale-95 dark:text-white" onClick={() => setShowLinks(!showLinks)}> <List /> </button>
          </div>
        </div>

        {/* links */}
        <ul className={`${showLinks ? 'block' : 'hidden'} md:flex justify-center col-span-2 md:col-span-1`}>
          {navLinks.map(link => <NavbarLink key={link.id} link={link} />)}
          {user && <NavbarLink link={{ text: 'My-Dashboard', path: '/dashboard-user/my-profile' }} />}
          {user && <AdminNavLinks />}
        </ul>
        
      </div>
    </nav>
  );
}

export default Navbar;

// Check admin only after user is available
function AdminNavLinks() {
  const { userData, isPending } = useUserFromDb()

  if (isPending) return
  if (userData.rank === 'admin') {
    return (  
      <NavbarLink link={{ text: 'Admin-Dashboard', path: '/dashboard-admin/admin-profile' }} />
    );
  }
}

export { AdminNavLinks };