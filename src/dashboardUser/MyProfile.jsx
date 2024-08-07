import useUserFromDb from "../hooks/useUserFromDb";
import SectionHeader from "../comps/SectionHeader";
import Loading from "../comps/Loading";


function MyProfile() {
  const {userData, isPending, user} = useUserFromDb()

  if (isPending) {return <Loading/>}
  return (  
    <div className="px-4 py-10 bg-gray-100 dark:bg-gray-800 rounded-md">
      <SectionHeader title={'My Profile'} />
      <div className="space-y-3 flex flex-col items-center text-center">
        <img src={user.photoURL} className="size-36 object-cover rounded-md border border-orange-600" alt="profile photo" />
        <h3 className="text-2xl md:text-4xl font-bold text-orange-600">{user.displayName}</h3>
        <p>Email: {user.email}</p>
        <p>Badge: {userData.badge}</p>
      </div>
    </div>
  );
}

export default MyProfile;