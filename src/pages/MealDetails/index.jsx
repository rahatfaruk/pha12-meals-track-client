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

  const { data: meal, isPending } = useQuery({
    queryKey: ['meal-details', id],
    queryFn: async () => {
      const res = await axiosPublic.get('/meals.json')
      return res.data.find(meal => meal._id === id)
    }
  })

  if (isPending) {
    return <Loading />
  }
  return (  
    <div className="flex-1 dark:bg-gray-900 dark:text-gray-100">
      <Details meal={meal} />
      <Reviews meal={meal} />
    </div>
  );
}

export default MealDetails;