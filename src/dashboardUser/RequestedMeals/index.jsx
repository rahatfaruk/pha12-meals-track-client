import { useQuery } from "@tanstack/react-query";
import SectionHeader from "../../comps/SectionHeader";
import useAxios from '../../hooks/useAxios';
import useAuth from "../../hooks/useAuth";
import Table from "./Table";

const requestedMeals = [
  {
    _id: '1',
    title: "Scrambled Eggs with Bacon",
    likes: 46,
    status: 'requested',
    reviews_count: 2,
    email: "ali@mail.com"
  },
  {
    _id: '2',
    title: "Blueberry Pancakes",
    likes: 54,
    status: 'delivered',
    reviews_count: 2,
    email: "ali@mail.com"
  },
]

function RequestedMeals() {
  const {axiosPrivate} = useAxios()
  const {user} = useAuth()

  // TODO: get data from requestedMeals using user-email (only status); for each mealId, get meal (only title, likes), get all reviews based on email (only review_text); calculate reviews_count. Recommend:- (get everything inside server and return formatted array)

  return (  
    <div className="px-4 py-10 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto">
      <SectionHeader title={'My Requested Meals'} />
      <Table requestedMeals={requestedMeals} />
    </div>
  );
}

export default RequestedMeals;