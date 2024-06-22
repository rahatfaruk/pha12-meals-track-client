import { useQuery } from "@tanstack/react-query";
import SectionHeader from "../../comps/SectionHeader";
import useAxios from '../../hooks/useAxios';
import useAuth from "../../hooks/useAuth";
import Table from "./Table";
import Loading from "../../comps/Loading";
import { useState } from "react";

function MyReviews() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsLimit = 10
  const {axiosPrivate} = useAxios()
  const {user} = useAuth()

  const { data, isPending, refetch } = useQuery({
    queryKey: ['my-reviews', currentPage],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/my-reviews/${user.email}`, {params: {currentPage, itemsLimit}})
      const {meals, reviews, totalPages} = res.data 
      // make an array where each review also contains correspond meal 
      let customReviews = reviews.map(review => {
        const targetMeal = meals.find(meal => meal._id === review.meal_id)
        return {...targetMeal, ...review}
      })

      return {customReviews, totalPages}
    }
  })

  if (isPending) {return <Loading />}
  const {customReviews, totalPages} = data
  
  return (  
    <div className="px-4 py-10 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto">
      <SectionHeader title={'My Reviews'} />
      <Table reviews={customReviews} refetch={refetch} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default MyReviews;