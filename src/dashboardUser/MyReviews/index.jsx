import { useQuery } from "@tanstack/react-query";
import SectionHeader from "../../comps/SectionHeader";
import useAxios from '../../hooks/useAxios';
import useAuth from "../../hooks/useAuth";
import Table from "./Table";

const reviews = [
  {
    _id: '1',
    // comes from meal based on the email
    title: "Scrambled Eggs with Bacon",
    likes: 46,
    // comes from review
    review_text: 'The ingredients were fresh and perfectly cooked. I would highly recommend it.',
    email: "ali@mail.com"
  },
  {
    _id: '2',
    title: "Blueberry Pancakes",
    likes: 54,
    review_text: 'The meal was good, but a bit bland.',
    email: "ali@mail.com"
  },
]

function MyReviews() {
  const {axiosPrivate} = useAxios()
  const {user} = useAuth()

  // TODO: get data from requestedMeals using user-email (only status); for each mealId, get meal (only title, likes), get all reviews based on email (only review_text); calculate reviews_count. Recommend:- (get everything inside server and return formatted array)

  return (  
    <div className="px-4 py-10 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto">
      <SectionHeader title={'My Reviews'} />
      <Table reviews={reviews} />
    </div>
  );
}

export default MyReviews;