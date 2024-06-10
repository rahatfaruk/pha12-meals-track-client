import { useQuery } from "@tanstack/react-query";
import Loading from "../../comps/Loading";
import SectionHeader from "../../comps/SectionHeader";
import useAxios from "../../hooks/useAxios";
import { dashboardBodyClass } from "../index";
import Table from "./Table";
import { Search } from "react-bootstrap-icons";

function ServeMeals() {
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
      <SectionHeader title={'Serve Meals'} />

      <form className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1 flex bg-gray-200 rounded-md">
          <input type="text" name="search" className="flex-1 bg-transparent min-w-0 py-1 px-3" placeholder="search by username" />
          <button type="submit" className="inline-block py-2 px-3 text-xl hover:opacity-80 bg-gray-300 rounded-r-md dark:bg-gray-700"><Search/></button>
        </div>
        <div className="flex-1 flex bg-gray-200 rounded-md">
          <input type="text" name="search" className="flex-1 bg-transparent min-w-0 py-1 px-3" placeholder="search by email" />
          <button type="submit" className="inline-block py-2 px-3 text-xl hover:opacity-80 bg-gray-300 rounded-r-md dark:bg-gray-700"><Search/></button>
        </div>
      </form>

      <Table meals={meals} />
    </div>
  );
}

export default ServeMeals;