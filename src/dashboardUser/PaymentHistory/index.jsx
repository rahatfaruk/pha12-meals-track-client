import { useQuery } from "@tanstack/react-query";
import SectionHeader from "../../comps/SectionHeader";
import useAuth from "../../hooks/useAuth";
import Table from "./Table";
import Loading from "../../comps/Loading";
import useAxios from "../../hooks/useAxios";

function PaymentHistory() {
  const {user} = useAuth()
  const {axiosPrivate} = useAxios()
  const { data:payments, isPending } = useQuery({
    queryKey: ['my-payments'],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/my-payments/${user.email}`)
      return res.data
    }
  })

  if (isPending) {return <Loading />}

  return (  
    <div className="px-4 py-10 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto">
      <SectionHeader title={'Payment History'} />
      <Table payments={payments} />
    </div>
  );
}

export default PaymentHistory;