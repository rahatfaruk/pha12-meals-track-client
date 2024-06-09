import { useQuery } from "@tanstack/react-query";
import Loading from "../../comps/Loading";
import SectionHeader from "../../comps/SectionHeader";
import useAxios from "../../hooks/useAxios";
import { dashboardBodyClass } from "../index";
import Table from "./Table";

function AllMeals() {
  const {axiosPrivate} = useAxios()
  const {data:meals, isPending} = useQuery({
    queryKey: ['all-meals', 'admin'],
    queryFn: async () => {
      const res = await axiosPrivate.get('/meals.json')
      return res.data
    }
  })

  if(isPending) {return <Loading/>}
  return (  
    <div className={dashboardBodyClass}>
      <SectionHeader title={'All Meals'} />
      <Table meals={meals} />
    </div>
  );
}

export default AllMeals;