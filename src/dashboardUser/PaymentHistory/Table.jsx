import TablePagination from "../../comps/TablePagination"

function Table({payments, ...paginationProps}) {
  if (payments.length < 1) {
    return <p className="text-center py-4 px-2 text-xl font-semibold">No Payment availabe to show!</p>
  } 
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg dark:border">
      <table className="w-full text-sm md:text-base text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs md:text-base text-gray-700 uppercase bg-orange-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">Trx id</th>
            <th scope="col" className="px-4 py-3">Amount</th>
            <th scope="col" className="px-4 py-3">Pay Time</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-orange-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th className="px-4 py-4 text-sm max-w-xs">{payment.trx_id}</th>
              <td className="px-4 py-4 text-sm max-w-xs">${payment.amount} {payment.currency}</td>
              <td className="px-4 py-4 text-sm max-w-xs">{new Date(payment.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
        <TablePagination {...paginationProps} />
      </table>
    </div>
  )
}

export default Table