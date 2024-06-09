import NavbarLink from "../../comps/NavbarLink";

const navLinks = [
  { id: 1, text: 'Admin Profile', path: '/dashboard-admin/my-profile' },
  { id: 2, text: 'Manage Users', path: '/dashboard-admin/manage-users' },
  { id: 3, text: 'Add Meal', path: '/dashboard-admin/add-meal' },
  { id: 4, text: 'All Meals', path: '/dashboard-admin/all-meals' },
  { id: 5, text: 'All Reviews', path: '/dashboard-admin/all-reviews' },
  { id: 6, text: 'Serve Meals', path: '/dashboard-admin/serve-meals' },
  { id: 7, text: 'Upcoming Meals', path: '/dashboard-admin/upcoming-meals' },
]

function SideNav() {
  return (  
    <div className="p-4 bg-gray-100 rounded-md dark:bg-gray-800">
      <h2 className="text-2xl text-orange-600 mb-2">Admin Dashboard</h2>

      <ul>
        {navLinks.map(link => <NavbarLink key={link.id} link={link} />)}
      </ul>
      
    </div>
  );
}

export default SideNav;
