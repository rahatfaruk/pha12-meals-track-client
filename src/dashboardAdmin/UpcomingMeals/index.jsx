import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { dashboardBodyClass } from "../index";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Loading from "../../comps/Loading";
import SectionHeader from "../../comps/SectionHeader";
import Table from "./Table";
import AddMeal from "./AddMeal";

function UpcomingMealsAdmin() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsLimit = 10
  const {axiosPrivate} = useAxios()
  const {user} = useAuth()
  const {data, isPending, refetch} = useQuery({
    queryKey: ['upcoming-meals', 'admin', currentPage],
    queryFn: async () => {
      const res = await axiosPrivate.get('/all-upcoming-meals', {params: {currentPage, itemsLimit}})
      return res.data
    }
  })

  // onclick publish-meal: 
  const handlePublishMeal = async upcomingMeal => {
    await axiosPrivate.delete(`/delete-upcoming-meal/${upcomingMeal._id}?email=${user.email}`)
    await axiosPrivate.post(`/add-meal?email=${user.email}`, upcomingMeal)
    await refetch()
    toast.success('Published successfully!')
  }

  if(isPending) {return <Loading/>}
  const {upcomingMeals, totalPages} = data
  return (  
    <div className={dashboardBodyClass}>
      <SectionHeader title={'Upcoming Meals'} />

      <AddMeal refetch={refetch} />
      <Table upcomingMeals={upcomingMeals} onPublishMeal={handlePublishMeal} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default UpcomingMealsAdmin;