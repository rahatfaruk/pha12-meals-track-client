import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from '../../hooks/useAxios';
import useAuth from "../../hooks/useAuth";
import Loading from "../../comps/Loading";
import SectionHeader from "../../comps/SectionHeader";
import Table from "./Table";

function RequestedMeals() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsLimit = 10
  const {axiosPrivate} = useAxios()
  const {user} = useAuth()

  // get data from requestedMeals using user-email: reqMeal: {_id, status, email, meal_id}, meal: {title, likes, reviews_count} 
  const { data, isPending, refetch } = useQuery({
    queryKey: ['my-requested-meals', currentPage],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/my-requested-meals/${user.email}`, {params: {currentPage, itemsLimit}})
      const {meals, myReqMeals, totalPages} = res.data
      const modifiedData = myReqMeals.map(reqMeal => {
        const targetMeal = meals.find(meal => meal._id === reqMeal.meal_id)
        return {...targetMeal, ...reqMeal} // only reqMeal _id stays
      })

      return {myRequestedMeals:modifiedData, totalPages}
    }
  })

  if (isPending) {return <Loading />}
  const {myRequestedMeals, totalPages} = data
  return (  
    <div className="px-4 py-10 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto">
      <SectionHeader title={'My Requested Meals'} />
      <Table requestedMeals={myRequestedMeals} refetch={refetch} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default RequestedMeals;