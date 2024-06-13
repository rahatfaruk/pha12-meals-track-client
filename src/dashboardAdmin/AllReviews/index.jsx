import { useQuery } from "@tanstack/react-query";
import { dashboardBodyClass } from "../index";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Loading from "../../comps/Loading";
import SectionHeader from "../../comps/SectionHeader";
import Table from "./Table";

function AllReviews() {
  const {axiosPrivate} = useAxios()
  const {user} = useAuth()

  const {data:reviews, isPending, refetch} = useQuery({
    queryKey: ['all-reviews', 'admin'],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/all-reviews?email=${user.email}`)
      const {meals, reviews} = res.data

      const modifiedReviews = reviews.map(review => {
        const targetMeal = meals.find(meal => meal._id === review.meal_id)
        return {...targetMeal, ...review}
      })

      return modifiedReviews
    }
  })

  if(isPending) {return <Loading/>}
  return (  
    <div className={dashboardBodyClass}>
      <SectionHeader title={'All Reviews'} />
      <Table reviews={reviews} refetch={refetch} />
    </div>
  );
}

export default AllReviews;