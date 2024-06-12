import { useQuery } from "@tanstack/react-query";
import useAxios from '../../hooks/useAxios';
import useAuth from "../../hooks/useAuth";
import Loading from "../../comps/Loading";
import SectionHeader from "../../comps/SectionHeader";
import Table from "./Table";

function RequestedMeals() {
  const {axiosPrivate} = useAxios()
  const {user} = useAuth()

  // get data from requestedMeals using user-email: reqMeal: {_id, status, email, meal_id}, meal: {title, likes, reviews_count} 
  const { data: myRequestedMeals, isPending } = useQuery({
    queryKey: ['my-requested-meals'],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/my-requested-meals/${user.email}`)
      const {meals, myReqMeals} = res.data
      const modifiedData = myReqMeals.map(reqMeal => {
        const targetMeal = meals.find(meal => meal._id === reqMeal.meal_id)
        return {...targetMeal, ...reqMeal} // only reqMeal _id stays
      })
      return modifiedData
    }
  })

  if (isPending) {return <Loading />}
  return (  
    <div className="px-4 py-10 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto">
      <SectionHeader title={'My Requested Meals'} />
      <Table requestedMeals={myRequestedMeals} />
    </div>
  );
}

export default RequestedMeals;