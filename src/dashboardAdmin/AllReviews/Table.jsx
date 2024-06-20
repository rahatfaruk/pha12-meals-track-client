import { Link } from "react-router-dom";
import Button from "../../comps/Button"
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

// meals.json :: title, likes, review_count
// reviews.json :: review_text

function Table({reviews, refetch}) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg dark:border">
      <table className="w-full text-sm md:text-base text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs md:text-base text-gray-700 uppercase bg-orange-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">Review text</th>
            <th scope="col" className="px-4 py-3">Reviewer</th>
            <th scope="col" className="px-4 py-3">Meal Title</th>
            <th scope="col" className="px-4 py-3">Likes</th>
            <th scope="col" className="px-4 py-3">Reviews</th>
            <th scope="col" className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length < 1 ? 
          <p className="text-center py-8 px-2 text-xl font-semibold">No reviews availabe to show!</p> :
          reviews.map(review => <TableRow key={review._id} review={review} refetch={refetch} />)}
        </tbody>
      </table>
    </div>
  )
}
export default Table


function TableRow({review, refetch}) {
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

  return (  
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-orange-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-4 py-4 text-sm max-w-xs min-w-48">{review.review_text}</td>
      <td className="px-4 py-4 text-sm max-w-xs">{review.reviewer_name}</td>
      <td className="px-4 py-4 text-sm max-w-xs min-w-48">{review.title}</td>
      <td className="px-4 py-4 text-sm max-w-xs">{review.likes}</td>
      <td className="px-4 py-4 text-sm max-w-xs">{review.reviews_count}</td>
      <td className="px-4 py-4 text-sm max-w-xs flex gap-4 flex-wrap lg:flex-nowrap">
        <Button onClick={() => handleDeleteReview(review._id)} className="bg-red-600">Delete</Button>
        <Button ><Link to={`/meals/${review.meal_id}`}>View Meal</Link></Button>
      </td>
    </tr>
  );
}
