import { useQuery } from "@tanstack/react-query";
import { maxContent } from "../../App";
import useAxios from "../../hooks/useAxios";
import Loading from "../../comps/Loading";
import SectionHeader from "../../comps/SectionHeader";
import MealCard from "../../comps/MealCard";

function Meals() {
  const { axiosPublic } = useAxios()

  const { data: meals, isPending } = useQuery({
    queryKey: ['hompage-meals'],
    queryFn: async () => {
      const res = await axiosPublic.get('/homepage-meals')
      return res.data
    }
  })

  if (isPending) {
    return <Loading />
  }
  return (
    <section className="px-4">
      <div className={`${maxContent} py-10`}>
        <SectionHeader title={'Latest Meals'} />

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
