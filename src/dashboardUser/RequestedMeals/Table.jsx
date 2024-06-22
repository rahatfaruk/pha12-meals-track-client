import Swal from 'sweetalert2';
import useAxios from '../../hooks/useAxios';
import Button from '../../comps/Button';
import useAuth from '../../hooks/useAuth';
import TablePagination from '../../comps/TablePagination';

function Table({requestedMeals, refetch, ...paginationProps}) {
  const {axiosPrivate} = useAxios()
  const {user} = useAuth()

  // confirm for deletion; then delete
  const handleDeleteMeal = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })
    if (confirmResult.isConfirmed) {
      await axiosPrivate.delete(`/delete-requested-meal/${id}?email=${user.email}`)
      await refetch()
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  }

  if (requestedMeals.length < 1) {
    return <p className="text-center py-4 px-2 text-xl font-semibold text-gray-500">No meals are requested!</p>
  } 
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg dark:border">
      <table className="w-full text-sm md:text-base text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs md:text-base text-gray-700 uppercase bg-orange-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">Meal title</th>
            <th scope="col" className="px-4 py-3">Likes</th>
            <th scope="col" className="px-4 py-3">Reviews</th>
            <th scope="col" className="px-4 py-3">Status</th>
            <th scope="col" className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          { requestedMeals.map(rMeal => (
            <tr key={rMeal._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-orange-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th scope="row" className="px-4 py-4 font-medium text-gray-900 dark:text-white">{rMeal.title}</th>
              <td className="px-4 py-4">{rMeal.likes}</td>
              <td className="px-4 py-4 text-sm">{rMeal.reviews_count}</td>
              <td className="px-4 py-4 text-sm">{rMeal.status}</td>
              <td className="px-4 py-4 text-sm">
                <Button onClick={() => handleDeleteMeal(rMeal._id)} >Cancel</Button>
              </td>
            </tr>
          ))}
        </tbody>
        <TablePagination {...paginationProps} />
      </table>
    </div>
  )
}

export default Table