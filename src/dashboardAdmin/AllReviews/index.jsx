import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { dashboardBodyClass } from "../index";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Loading from "../../comps/Loading";
import SectionHeader from "../../comps/SectionHeader";
import Table from "./Table";

function AllReviews() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsLimit = 10
  const {axiosPrivate} = useAxios()
  const {user} = useAuth()

  const {data, isPending, refetch} = useQuery({
    queryKey: ['all-reviews', 'admin', currentPage],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/all-reviews?email=${user.email}`, {params: {currentPage, itemsLimit}})
      const {meals, reviews, totalPages} = res.data

      const modifiedReviews = reviews.map(review => {
        const targetMeal = meals.find(meal => meal._id === review.meal_id)
        return {...targetMeal, ...review}
      })

      return {reviews:modifiedReviews, totalPages}
    }
  })

  if(isPending) {return <Loading/>}
  const {reviews, totalPages} = data

  return (  
    <div className={dashboardBodyClass}>
      <SectionHeader title={'All Reviews'} />
      <Table reviews={reviews} refetch={refetch} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default AllReviews;