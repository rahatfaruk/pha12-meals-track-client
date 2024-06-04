import { useQuery } from "@tanstack/react-query";
import { maxContent } from "../../App";
// comps
import useAxios from "../../hooks/useAxios";
import SectionHeader from "../../comps/SectionHeader";
import Loading from "../../comps/Loading";
import MealCard from "../../comps/MealCard";
import { HandThumbsUp } from "react-bootstrap-icons";

function UpcomingMeals() {
  const { axiosPublic } = useAxios()
  const { data: upcomingMeals, isPending } = useQuery({
    queryKey: ['all-meals'],
    queryFn: async () => {
      const res = await axiosPublic.get('/upcomingMeals.json')
      return res.data
    }
  })

  if (isPending) { return <Loading /> }
  return (
    <section className="px-4 dark:bg-gray-900 dark:text-gray-100">
      <div className={`${maxContent} py-12 flex-1`}>
        <SectionHeader title={'Upcoming Meals'} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {upcomingMeals.length > 0 ?
            upcomingMeals.map(meal => (
              <MealCard key={meal._id} meal={meal} >
                <button className="flex items-center justify-center w-full mt-4 px-4 py-2 rounded-md text-white bg-blue-600 hover:opacity-90 text-center">
                  <span className="flex items-center gap-1"><HandThumbsUp /> Like</span>
                  <span className="inline-block ml-2 px-2 text-sm bg-blue-900 rounded-badge">{meal.likes}</span>
                </button>
              </MealCard>
            )) :
            <p className="text-lg text-gray-500">No meals found!</p>
          }
        </div>
      </div>
    </section>
  );
}

export default UpcomingMeals;