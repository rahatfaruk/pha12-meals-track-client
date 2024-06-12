import { useQuery } from "@tanstack/react-query";
import SectionHeader from "../../comps/SectionHeader";
import useAxios from '../../hooks/useAxios';
import useAuth from "../../hooks/useAuth";
import Table from "./Table";
import Loading from "../../comps/Loading";

function MyReviews() {
  const {axiosPrivate} = useAxios()
  const {user} = useAuth()

  const { data: customReviews, isPending, refetch } = useQuery({
    queryKey: ['my-reviews'],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/reviews-with-meals/${user.email}`)
      const {meals, reviews} = res.data 
      // make an array where each review also contains correspond meal 
      let customReviews = reviews.map(review => {
        const targetMeal = meals.find(meal => meal._id === review.meal_id)
        return {...targetMeal, ...review}
      })
      return customReviews
    }
  })

  if (isPending) {return <Loading />}
  return (  
    <div className="px-4 py-10 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto">
      <SectionHeader title={'My Reviews'} />
      <Table reviews={customReviews} />
    </div>
  );
}

export default MyReviews;