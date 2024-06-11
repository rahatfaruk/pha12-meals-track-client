import { Search } from "react-bootstrap-icons";
import { useQuery } from "@tanstack/react-query";
import { maxContent } from "../../App";
// comps
import useAxios from "../../hooks/useAxios";
import SectionHeader from "../../comps/SectionHeader";
import Loading from "../../comps/Loading";
import MealCard from "../../comps/MealCard";

function Meals() {
  const {axiosPublic} = useAxios()
  const {data:meals, isPending} = useQuery({
    queryKey: ['all-meals'],
    queryFn: async () => {
      const res = await axiosPublic.get('/meals')
      return res.data
    }
  })

  if(isPending) {return <Loading />}
  return (
    <section className="px-4 dark:bg-gray-900 dark:text-gray-100">
      <div className={`${maxContent} py-6 pb-12 flex-1`}>
        <SectionHeader title={'All Meals'} />

        {/* search, filter meals */}
        <div>
          <form className="mb-4">
            <div className="flex-1 flex bg-gray-200 rounded-md">
              <input type="text" name="search" className="flex-1 bg-transparent min-w-0 py-1 px-3" placeholder="search product name" />
              <button type="submit" className="inline-block py-2 px-3 text-xl hover:opacity-80 bg-gray-300 rounded-r-md dark:bg-gray-700"><Search/></button>
            </div>
          </form>
          <div className="flex items-center gap-6">
            <select name="category" className="border min-w-0 px-6 py-2 rounded-md bg-gray-200 dark:bg-gray-700" defaultValue={''}>
              <option value='' disabled>Filter by Category</option>
              <option value="breakfast">breakfast</option>
              <option value="lunch">lunch</option>
              <option value="dinner">dinner</option>
            </select>

            <div className="flex-1 flex gap-4">
              <input type="text" className="border min-w-0 px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 w-1/2" placeholder="min" />
              <input type="text" className="border min-w-0 px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 w-1/2" placeholder="max" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center pt-10">
          {meals.length > 0 ? 
            meals.map(meal => <MealCard key={meal._id} meal={meal} />) :
            <p className="text-lg text-gray-500">No meals found!</p>
          }
        </div>
      </div>
    </section>
  );
}

export default Meals;