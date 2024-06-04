import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { StarFill } from "react-bootstrap-icons";
import { maxContent } from "../../App";
import useAxios from "../../hooks/useAxios";
import Loading from "../../comps/Loading";
import SectionHeader from "../../comps/SectionHeader";

function Meals() {
  const { axiosPublic } = useAxios()

  const { data: meals, isPending } = useQuery({
    queryKey: ['hompage-meals'],
    queryFn: async () => {
      const res = await axiosPublic.get('/meals.json')
      return res.data
    }
  })

  if (isPending) {
    return <Loading />
  }
  return (
    <section className="px-4">
      <div className={`${maxContent} py-10`}>
        <SectionHeader title={'Meals'} />

        <div role="tablist" className="tabs tabs-lifted">
          <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="All" defaultChecked />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
              {meals.map(meal => (
                <MealCard key={meal._id} meal={meal} />
              ))}
            </div>
          </div>

          <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Breakfast" />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
              {meals.filter(meal => meal.category==='breakfast').map(meal => (
                <MealCard key={meal._id} meal={meal} />
              ))}
            </div>
          </div>

          <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Lunch" />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
              {meals.filter(meal => meal.category==='lunch').map(meal => (
                <MealCard key={meal._id} meal={meal} />
              ))}
            </div>
          </div>

          <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Dinner" />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
              {meals.filter(meal => meal.category==='dinner').map(meal => (
                <MealCard key={meal._id} meal={meal} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Meals;


function MealCard({meal}) {
  const {_id, image, title, rating, price, category} = meal
  return (
    <div className="max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <figure className="relative">
        <img src={image} className="w-full h-60 rounded-t-lg object-cover" alt="" />
        <span className="absolute top-4 left-4 flex gap-1.5 items-center bg-orange-100 text-orange-800 font-semibold px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-800"> <StarFill /> {rating} </span>
      </figure>
      <div className="px-6 py-4">
        <h3 className="mb-1 text-2xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="mb-2">Category: {category}</p>
        <div className="flex justify-between gap-4 items-center">
          <p className="text-xl font-semibold text-orange-600 ">${price}</p>
          <Link to={`/meal/${_id}`} className="inline-block px-4 py-1 rounded-md text-white bg-orange-600 hover:opacity-90">Details</Link>
        </div>
      </div>
    </div>
  );
}
