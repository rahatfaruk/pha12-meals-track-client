import { useQuery } from "@tanstack/react-query";
import Loading from "../../comps/Loading";
import SectionHeader from "../../comps/SectionHeader";
import useAxios from "../../hooks/useAxios";
import { dashboardBodyClass } from "../index";
import Table from "./Table";

function AllReviews() {
  const {axiosPrivate} = useAxios()
  const {data:reviews, isPending} = useQuery({
    queryKey: ['all-reviews', 'admin'],
    queryFn: async () => {
      const res = await axiosPrivate.get('/reviews.json')
      return res.data
    }
  })

  if(isPending) {return <Loading/>}
  return (  
    <div className={dashboardBodyClass}>
      <SectionHeader title={'All Reviews'} />
      <Table reviews={reviews} />
    </div>
  );
}

export default AllReviews;