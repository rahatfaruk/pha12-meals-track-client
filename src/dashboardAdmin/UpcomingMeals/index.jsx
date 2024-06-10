import { useQuery } from "@tanstack/react-query";
import Loading from "../../comps/Loading";
import SectionHeader from "../../comps/SectionHeader";
import useAxios from "../../hooks/useAxios";
import { dashboardBodyClass } from "../index";
import Table from "./Table";
import AddMeal from "./AddMeal";

function UpcomingMealsAdmin() {
  const {axiosPrivate} = useAxios()
  const {data:upcomingMeals, isPending} = useQuery({
    queryKey: ['upcoming-meals', 'admin'],
    queryFn: async () => {
      const res = await axiosPrivate.get('/upcomingMeals.json')
      return res.data
    }
  })

  if(isPending) {return <Loading/>}
  return (  
    <div className={dashboardBodyClass}>
      <SectionHeader title={'Upcoming Meals'} />

      <AddMeal />
      <Table upcomingMeals={upcomingMeals} />
    </div>
  );
}

export default UpcomingMealsAdmin;