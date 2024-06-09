import Button from "../../comps/Button"

function Table({users}) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg dark:border">
      <table className="w-full text-sm md:text-base text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs md:text-base text-gray-700 uppercase bg-orange-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">Email</th>
            <th scope="col" className="px-4 py-3">Username</th>
            <th scope="col" className="px-4 py-3">Badge</th>
            <th scope="col" className="px-4 py-3">Is Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.length < 1 ? 
          <p className="text-center py-8 px-2 text-xl font-semibold">No users availabe to show!</p> :
          users.map(user => (
            <tr key={user._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-orange-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th className="px-4 py-4 text-sm max-w-xs">{user.email}</th>
              <td className="px-4 py-4 text-sm max-w-xs">{user.displayName}</td>
              <td className="px-4 py-4 text-sm max-w-xs">{user.badge}</td>
              <td className="px-4 py-4 text-sm max-w-xs">
                {user?.rank === 'admin' ? 
                  <p>Admin</p> :
                  <Button >Make admin</Button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table