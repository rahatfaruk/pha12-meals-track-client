import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Loading from "../../comps/Loading";
import SectionHeader from "../../comps/SectionHeader";
import { dashboardBodyClass } from "../index";
import Table from "./Table";
import { useState } from "react";

function AllMeals() {
  const {axiosPrivate} = useAxios()
  const {user} = useAuth()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsLimit = 10

  const {data, isPending, refetch} = useQuery({
    queryKey: ['all-meals', 'admin', currentPage],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/all-meals?email=${user.email}`, {params: {currentPage, itemsLimit}})
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
  const {meals, totalPages} = data
  
  return (  
    <div className={dashboardBodyClass}>
      <SectionHeader title={'All Meals'} />
      <Table meals={meals} onDeleteMeal={handleDeleteMeal} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default AllMeals;