import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Loading from "../../comps/Loading";
import SectionHeader from "../../comps/SectionHeader";
import SearchForm from "../../comps/SearchFormEmailNdName";
import Table from "./Table";

function ManageUsers() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsLimit = 10
  const {axiosPrivate} = useAxios()
  const [myQuery, setMyQuery] = useState({})
  const {user} = useAuth()

  const {data, isPending, refetch} = useQuery({
    queryKey: ['manage-all-users', myQuery, currentPage],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/all-users?userEmail=${user.email}`, {params: {...myQuery, currentPage, itemsLimit}})
      return res.data
    }
  })

  if(isPending) {return <Loading/>}
  const {users, totalPages} = data
  return (  
    <div className="px-4 py-10 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto">
      <SectionHeader title={'Manage Users'} />

      <SearchForm myQuery={myQuery} setMyQuery={setMyQuery} />
      <Table users={users} refetch={refetch} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default ManageUsers;