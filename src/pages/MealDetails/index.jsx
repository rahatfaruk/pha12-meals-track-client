import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
// comps
import Loading from "../../comps/Loading";
import Details from "./Details";
import Reviews from "./Reviews";

function MealDetails() {
  const { axiosPublic } = useAxios()
  const {id} = useParams()

  const { data: meal, isPending, refetch:refetchMeal } = useQuery({
    queryKey: ['meal-details', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/meals/${id}`)
      return res.data
    }
  })

  if (isPending) {return <Loading />}
  return (  
    <div className="flex-1 dark:bg-gray-900 dark:text-gray-100">
      <Details meal={meal} refetchMeal={refetchMeal} />
      <Reviews meal_id={meal._id} />
    </div>
  );
}

export default MealDetails;