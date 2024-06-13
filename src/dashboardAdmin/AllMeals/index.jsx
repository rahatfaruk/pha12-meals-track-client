import { useQuery } from "@tanstack/react-query";
import Loading from "../../comps/Loading";
import SectionHeader from "../../comps/SectionHeader";
import useAxios from "../../hooks/useAxios";
import { dashboardBodyClass } from "../index";
import Table from "./Table";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function AllMeals() {
  const {axiosPrivate} = useAxios()
  const {user} = useAuth()

  const {data:meals, isPending, refetch} = useQuery({
    queryKey: ['all-meals', 'admin'],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/all-meals?email=${user.email}`)
      return res.data
    }
  })

  // confirm for deletion; then delete
  const handleDeleteMeal = async (mealId) => {
    const alertResult = await Swal.fire({
      title: "Are you sure?", text: "You won't be able to revert this!", icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6", cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })
    if (alertResult.isConfirmed) {
      await axiosPrivate.delete(`/delete-meal/${mealId}?email=${user.email}`)
      await refetch()
      Swal.fire({ title: "Deleted!", text: "Your file has been deleted.", icon: "success" });
    }
  }

  if(isPending) {return <Loading/>}
  return (  
    <div className={dashboardBodyClass}>
      <SectionHeader title={'All Meals'} />
      <Table meals={meals} onDeleteMeal={handleDeleteMeal} />
    </div>
  );
}

export default AllMeals;