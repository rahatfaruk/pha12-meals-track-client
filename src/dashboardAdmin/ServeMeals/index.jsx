import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { dashboardBodyClass } from "../index";
import useAxios from "../../hooks/useAxios";
import Loading from "../../comps/Loading";
import SectionHeader from "../../comps/SectionHeader";
import Table from "./Table";
import SearchForm from "../../comps/SearchFormEmailNdName";
import useAuth from "../../hooks/useAuth";

function ServeMeals() {
  const {axiosPrivate} = useAxios()
  const [myQuery, setMyQuery] = useState({})
  const {user} = useAuth()

  const {data:serveMeals, isPending, refetch} = useQuery({
    queryKey: ['serve-meals', 'admin', myQuery],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/serve-meals?userEmail=${user.email}`, {params: myQuery})
      const {reqMeals, meals} = res.data
      // join reqMeal with correspond meal & user
      const modifiedReqMeals = reqMeals.map(rMeal => {
        const targetMeal = meals.find(meal => meal._id === rMeal.meal_id)
        return {...targetMeal, ...rMeal}
      })
      return modifiedReqMeals
    }
  })

  const handleServeMeal = async reqMealId => {
    // patch req to change status
    await axiosPrivate.patch(`/update-serve-meal/${reqMealId}?email=${user.email}`)
    await refetch()
    toast.success('Meal served successfully!')
  }

  if(isPending) {return <Loading/>}
  return (  
    <div className={dashboardBodyClass}>
      <SectionHeader title={'Serve Meals'} />

      <SearchForm myQuery={myQuery} setMyQuery={setMyQuery} />

      <Table serveMeals={serveMeals} onServeMeal={handleServeMeal} />
    </div>
  );
}

export default ServeMeals;