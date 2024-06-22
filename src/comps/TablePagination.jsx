import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

function TablePagination({currentPage, setCurrentPage, totalPages}) {
  return (
    <tfoot>
      <tr>
        <td className="px-6 py-6 bg-gray-50 dark:bg-gray-900" colSpan={5}>
          <div className="flex space-x-1 dark:text-gray-800">
            <button onClick={() => setCurrentPage(currentPage - 1)} className="flex justify-center items-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-800 dark:text-white dark:border-gray-100 disabled:text-gray-400 dark:disabled:border-gray-500" disabled={currentPage === 1}><ChevronLeft /></button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`w-8 h-8 text-sm border rounded shadow-md dark:bg-gray-800 dark:text-white ${index + 1 === currentPage ? 'font-bold text-orange-600 dark:text-orange-600 border-orange-600' : 'dark:border-gray-100'}`}
                onClick={() => setCurrentPage(index + 1)}
              >{index + 1}</button>
            ))}

            <button onClick={() => setCurrentPage(currentPage + 1)} className="flex justify-center items-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-800 dark:text-white dark:border-gray-100 disabled:text-gray-400 dark:disabled:border-gray-500" disabled={currentPage === totalPages}><ChevronRight /></button>
            <p className="dark:text-white pl-4 text-sm">Total pages: {totalPages} </p>
          </div>
        </td>
      </tr>
    </tfoot>
  );
}

export default TablePagination;