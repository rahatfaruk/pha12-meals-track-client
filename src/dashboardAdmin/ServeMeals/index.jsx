import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Search } from "react-bootstrap-icons";
import { dashboardBodyClass } from "../index";
import useAxios from "../../hooks/useAxios";
import Loading from "../../comps/Loading";
import SectionHeader from "../../comps/SectionHeader";
import Table from "./Table";

function ServeMeals() {
  const {axiosPrivate} = useAxios()
  const {data:serveMeals, isPending, refetch} = useQuery({
    queryKey: ['serve-meals', 'admin'],
    queryFn: async () => {
      const res = await axiosPrivate.get('/serve-meals')
      const {reqMeals, meals, users} = res.data
      // join reqMeal with correspond meal & user
      const modifiedReqMeals = reqMeals.map(rMeal => {
        const targetMeal = meals.find(meal => meal._id === rMeal.meal_id)
        const targetUser = users.find(user => user.email === rMeal.email)
        return {...targetMeal, ...targetUser, ...rMeal}
      })
      return modifiedReqMeals
    }
  })

  const handleServeMeal = async reqMealId => {
    // patch req to change status
    await axiosPrivate.patch(`/update-serve-meal/${reqMealId}`)
    await refetch()
    toast.success('Meal served successfully!')
  }

  if(isPending) {return <Loading/>}
  return (  
    <div className={dashboardBodyClass}>
      <SectionHeader title={'Serve Meals'} />

      <form className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1 flex bg-gray-200 rounded-md">
          <input type="text" name="search" className="flex-1 bg-transparent min-w-0 py-1 px-3" placeholder="search by username" />
          <button type="submit" className="inline-block py-2 px-3 text-xl hover:opacity-80 bg-gray-300 rounded-r-md dark:bg-gray-700"><Search/></button>
        </div>
        <div className="flex-1 flex bg-gray-200 rounded-md">
          <input type="text" name="search" className="flex-1 bg-transparent min-w-0 py-1 px-3" placeholder="search by email" />
          <button type="submit" className="inline-block py-2 px-3 text-xl hover:opacity-80 bg-gray-300 rounded-r-md dark:bg-gray-700"><Search/></button>
        </div>
      </form>

      <Table serveMeals={serveMeals} onServeMeal={handleServeMeal} />
    </div>
  );
}

export default ServeMeals;