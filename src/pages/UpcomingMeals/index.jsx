import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { HandThumbsUp, HandThumbsUpFill } from "react-bootstrap-icons";
import { maxContent } from "../../App";
// comps
import useAxios from "../../hooks/useAxios";
import useUserFromDb from "../../hooks/useUserFromDb";
import SectionHeader from "../../comps/SectionHeader";
import Loading from "../../comps/Loading";
import MealCard from "../../comps/MealCard";

function UpcomingMeals() {
  const { axiosPublic, axiosPrivate } = useAxios()
  const { userData, isPending:isPendingUser } = useUserFromDb()

  const { data: upcomingMeals, isPending, refetch: refetchMeal } = useQuery({
    queryKey: ['all-upcoming-meals'],
    queryFn: async () => {
      const res = await axiosPublic.get('/upcoming-meals')
      return res.data
    }
  })

  // like btn: only premium user can give like
  const handleLikeBtn = async (meal_id) => {
    if (!userData || userData.badge === 'bronze') {
      toast.info('Only premium users can like!')
      return
    }
    else if (userData.badge === 'silver' || userData.badge === 'gold' || userData.badge === 'platinum') {
      const res = await axiosPrivate.post(`/add-user-like?email=${userData.email}`, { email: userData.email, meal_id })

      if (res.data.insertedId) {
        await axiosPrivate.patch(`/inc-upcoming-meal-like?email=${userData.email}`, { meal_id })
        // get upcomint-meal; check likes_count; if count >= 10, transfer meal into meals list ; refetch()
        const {data:targetUpcomingMeal} = await axiosPublic.get(`/upcoming-meals/${meal_id}`)
        if (targetUpcomingMeal.likes >= 10) {
          await axiosPrivate.post(`/add-meal?email=${userData.email}`, targetUpcomingMeal)
          await axiosPrivate.delete(`/delete-my-upcoming-meal/${meal_id}?email=${userData.email}`)
          toast.info('This meal has been transfered to meals-collection!')
        }
        refetchMeal()
      } else if (res.data.message) {
        toast.info(res.data.message)
      }
    }
  }

  if (isPending || isPendingUser) { return <Loading /> }
  return (
    <section className="px-4 dark:bg-gray-900 dark:text-gray-100">
      <div className={`${maxContent} py-12 flex-1`}>
        <SectionHeader title={'Upcoming Meals'} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {upcomingMeals.length > 0 ?
            // upcomingMeals.map(meal => (
            //   <MealCard key={meal._id} meal={meal} hideDetailsBtn={true} >
            //     <button onClick={() => handleLikeBtn(meal._id)} className="flex items-center justify-center w-full mt-4 px-4 py-2 rounded-md text-white bg-blue-600 hover:opacity-90 text-center">
            //       <span className="flex items-center gap-1"><HandThumbsUp /> Like</span>
            //       <span className="inline-block ml-2 px-2 text-sm bg-blue-900 rounded-badge">{meal.likes}</span>
            //     </button>
            //   </MealCard>
            // )) :
            upcomingMeals.map(meal => <ShowMealCard key={meal._id} meal={meal} handleLikeBtn={handleLikeBtn} userData={userData} />) :
            <p className="text-lg text-gray-500">No meals found!</p>
          }
        </div>
      </div>
    </section>
  );
}

export default UpcomingMeals;

function ShowMealCard({meal, handleLikeBtn}) {
  return (
    <MealCard meal={meal} hideDetailsBtn={true} >
      <button onClick={() => handleLikeBtn(meal._id)} className="flex items-center justify-center gap-2 w-full mt-4 px-4 py-2 rounded-md text-white bg-blue-600 hover:opacity-90 text-center disabled:opacity-75">
        <HandThumbsUp/> Like
        <span className="inline-block ml-2. px-2 text-sm bg-blue-900 rounded-badge">{meal.likes}</span>
      </button>
    </MealCard>
  );
}

export { ShowMealCard };