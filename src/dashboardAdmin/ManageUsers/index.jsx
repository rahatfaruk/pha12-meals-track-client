import { useQuery } from "@tanstack/react-query";
import SectionHeader from "../../comps/SectionHeader";
import useAxios from "../../hooks/useAxios";
import Loading from "../../comps/Loading";
import Table from "./Table";

const users = [
  {
    "_id": "user010",
    "badge": "bronze",
    "email": "ali@mail.com",
    "displayName": "ali",
    "rank": "admin"
  },
  {
    "_id": "user123",
    "badge": "silver",
    "email": "user123@example.com",
    "displayName": "user123",
    "rank": "user"
  },
  {
    "_id": "user456",
    "badge": "gold",
    "email": "user456@example.com",
    "displayName": "user456",
    "rank": "user"
  }
]

function ManageUsers() {
  const {axiosPrivate} = useAxios()
  const {data:users, isPending} = useQuery({
    queryKey: ['manage-users'],
    queryFn: async () => {
      const res = await axiosPrivate.get('/users.json')
      return res.data
    }
  })
  if(isPending) {return <Loading/>}
  return (  
    <div className="px-4 py-10 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto">
      <SectionHeader title={'Manage Users'} />
      <Table users={users}  />
    </div>
  );
}

export default ManageUsers;