import Swal from "sweetalert2"
import Button from "../../comps/Button"
import useAxios from "../../hooks/useAxios"
import { Link } from "react-router-dom"
import Modal from "./Modal"
import useAuth from "../../hooks/useAuth"
import TablePagination from "../../comps/TablePagination"

function Table({reviews, refetch, ...paginationProps}) {
  const {axiosPrivate} = useAxios()
  const {user} = useAuth()

  // confirm for deletion; then delete
  const handleDeleteReview = async (id) => {
    const alertResult = await Swal.fire({
      title: "Are you sure?", text: "You won't be able to revert this!", icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6", cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })
    if (alertResult.isConfirmed) {
      await axiosPrivate.delete(`/delete-review/${id}?email=${user.email}`)
      await refetch()
      Swal.fire({ title: "Deleted!", text: "Your file has been deleted.", icon: "success" });
    }
  }

  if (reviews.length < 1) {
    return <p className="text-center py-4 px-2 text-xl font-semibold text-gray-500">No review to show!</p>
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg dark:border">
      <table className="w-full text-sm md:text-base text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs md:text-base text-gray-700 uppercase bg-orange-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">Review</th>
            <th scope="col" className="px-4 py-3">Meal title</th>
            <th scope="col" className="px-4 py-3">Likes</th>
            <th scope="col" className="px-4 py-3">My-Rating</th>
            <th scope="col" className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          { reviews.map(review => (
            <tr key={review._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-orange-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td className="px-4 py-4 text-sm max-w-xs min-w-48">{review.review_text}</td>
              <td className="px-4 py-4 text-sm max-w-xs min-w-48">{review.title}</td>
              <td className="px-4 py-4 text-sm max-w-xs">{review.likes}</td>
              <td className="px-4 py-4 text-sm max-w-xs">{review.rating}</td>
              <td className="px-4 py-4 text-sm flex gap-3 flex-wrap lg:flex-nowrap">
                <Button onClick={() => document.getElementById(`review_edit_modal_${review._id}`).showModal()} className={'!bg-blue-600'}>Edit</Button>
                <Button onClick={() => handleDeleteReview(review._id)} className={'bg-red-600'}>Delete</Button>
                <Link to={`/meals/${review.meal_id}`} className="inline-block px-3 py-1 rounded-md text-white bg-orange-600 hover:opacity-90 whitespace-nowrap">View Meal</Link>
                <Modal review={review} refetch={refetch} />
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