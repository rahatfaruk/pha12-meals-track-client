import Button from "../../comps/Button"
import TablePagination from "../../comps/TablePagination";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios"
import {toast} from 'react-toastify';


function Table({users, refetch, ...paginationProps}) {
  const {axiosPrivate} = useAxios()
  const {user:loggedUser} = useAuth()

  const handleMakeAdmin = async (user) => {
    await axiosPrivate.patch(`/make-admin/${user._id}?email=${loggedUser.email}`)
    toast.success(`${user.displayName} is now an admin`)
    refetch()
  }

  if (users.length < 1) {
    return <p className="text-center py-4 px-2 text-xl font-semibold">No users availabe to show!</p>
  } 
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg dark:border">
      <table className="w-full text-sm md:text-base text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs md:text-base text-gray-700 uppercase bg-orange-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">Email</th>
            <th scope="col" className="px-4 py-3">Username</th>
            <th scope="col" className="px-4 py-3">Badge</th>
            <th scope="col" className="px-4 py-3">Rank</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-orange-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th className="px-4 py-4 text-sm max-w-xs">{user.email}</th>
              <td className="px-4 py-4 text-sm max-w-xs">{user.displayName}</td>
              <td className="px-4 py-4 text-sm max-w-xs">{user.badge}</td>
              <td className="px-4 py-4 text-sm max-w-xs">
                {user?.rank === 'admin' ? 
                  <p>Admin</p> :
                  <Button onClick={() => handleMakeAdmin(user)} >Make admin</Button>
                }
              </td>
            </tr>
          ))}
        </tbody>
        <TablePagination {...paginationProps} />
      </table>
    </div>
  )
}

export default Table