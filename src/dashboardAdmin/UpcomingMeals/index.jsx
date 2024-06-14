import { useQuery } from "@tanstack/react-query";
import Loading from "../../comps/Loading";
import SectionHeader from "../../comps/SectionHeader";
import useAxios from "../../hooks/useAxios";
import { dashboardBodyClass } from "../index";
import Table from "./Table";
import AddMeal from "./AddMeal";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function UpcomingMealsAdmin() {
  const {axiosPrivate} = useAxios()
  const {data:upcomingMeals, isPending, refetch} = useQuery({
    queryKey: ['upcoming-meals', 'admin'],
    queryFn: async () => {
      const res = await axiosPrivate.get('/all-upcoming-meals')
      return res.data
    }
  })

  // onclick publish-meal: 
  const handlePublishMeal = async upcomingMeal => {
    const {_id, ...upcomingMealExceptId} = upcomingMeal

    // delte upcoming-meal from upcoming-list
    await axiosPrivate.delete(`/delete-upcoming-meal/${upcomingMeal._id}`)
    // post upcoming-meal (without _id) into meals list;
    await axiosPrivate.post(`/add-meal`, upcomingMealExceptId)
    await refetch()
    toast.success('Published successfully!')
  }

  if(isPending) {return <Loading/>}
  return (  
    <div className={dashboardBodyClass}>
      <SectionHeader title={'Upcoming Meals'} />

      <AddMeal refetch={refetch} />
      <Table upcomingMeals={upcomingMeals} onPublishMeal={handlePublishMeal} />
    </div>
  );
}

export default UpcomingMealsAdmin;