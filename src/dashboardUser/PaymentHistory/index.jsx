import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SectionHeader from "../../comps/SectionHeader";
import useAuth from "../../hooks/useAuth";
import Table from "./Table";
import Loading from "../../comps/Loading";
import useAxios from "../../hooks/useAxios";

function PaymentHistory() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsLimit = 10
  const {user} = useAuth()
  const {axiosPrivate} = useAxios()
  const { data, isPending } = useQuery({
    queryKey: ['my-payments', currentPage],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/my-payments/${user.email}`, {params: {currentPage, itemsLimit}})
      return res.data
    }
  })

  if (isPending) {return <Loading />}
  const {payments, totalPages} = data
  return (  
    <div className="px-4 py-10 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto">
      <SectionHeader title={'Payment History'} />
      <Table payments={payments} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default PaymentHistory;