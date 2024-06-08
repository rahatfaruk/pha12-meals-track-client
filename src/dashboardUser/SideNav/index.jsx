import NavbarLink from "../../comps/NavbarLink";

const navLinks = [
  { id: 1, text: 'My Profile', path: '/dashboard-user/my-profile' },
  { id: 2, text: 'My Reviews', path: '/dashboard-user/my-reviews' },
  { id: 3, text: 'Requested Meals', path: '/dashboard-user/requested-meals' },
  { id: 4, text: 'Payment History', path: '/dashboard-user/payment-history' },
]

function SideNav() {
  return (  
    <div className="p-4 bg-gray-100 rounded-md dark:bg-gray-800">
      <h2 className="text-2xl text-orange-600 mb-2">User Dashboard</h2>

      <ul>
        {navLinks.map(link => <NavbarLink key={link.id} link={link} />)}
      </ul>
      
    </div>
  );
}

export default SideNav;
