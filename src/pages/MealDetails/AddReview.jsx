import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import useAuth from "../../hooks/useAuth"
import useAxios from "../../hooks/useAxios"

const reviewObj = {
  "_id": "review3",
  "meal_id": "6667973bfe4362ade11fc9a4",
  "reviewer_name": "John Doe",
  "reviewer_email": "john.doe@example.com",
  "reviewer_photo": "https://randomuser.me/api/portraits/men/50.jpg",
  "posted_time": 1654329600000,
  // from form >
  "review_text": "I would highly recommend it.",
  "rating": 4.2
}

function AddReview({meal_id, refetch}) {
  const { register, handleSubmit, reset, formState: {errors: formErr} } = useForm()
  const { user } = useAuth()
  const {axiosPrivate} = useAxios()

  const onSubmit = async (data) => {
    if (!user) {
      toast.warn('Login first!')
      return
    }
    // create review obj
    const newReview = {
      ...data,
      meal_id,
      reviewer_name: user.displayName,
      reviewer_email: user.email,
      reviewer_photo: user.photoURL,
      posted_time: new Date().getTime()
    }

    // send post req to add the review; refetch to update UI
    await axiosPrivate.post('/add-review', newReview)
    toast.success('review added')
    reset()
    refetch()
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6 border p-6 rounded-md shadow-md bg-gray-100 dark:bg-gray-800 dark:text-gray-100">
          <label className="block mb-4">
            <span className="block mb-1 text-sm text-gray-600 dark:text-gray-400">Your review</span>
            <input type="text" {...register('review_text', {required:true})} className="border w-full min-w-0 px-3 py-2 rounded-md bg-gray-50 shadow dark:text-gray-700" placeholder="your review text about this meal" />
            {formErr.review_text && <p className="text-sm text-red-500 mt-2">This field is required</p>}
          </label>

          <div className="flex gap-6">
            <label className="flex-1 block mb-4">
              <span className="block mb-1 text-sm text-gray-600 dark:text-gray-400">Your rating</span>
              <input type="text" {...register('rating', {required:true, min:0, max:5})} className="border w-full min-w-0 px-3 py-2 rounded-md bg-gray-50 shadow dark:text-gray-700" placeholder="e.g. 4.4" />
              {formErr.rating && <p className="text-sm text-red-500 mt-2">This field is required. Min: 0, max: 5</p>}
            </label>
            

            <div className="mt-6">
              <button type="submit" className="bg-orange-600 text-white w-full px-4 py-2 rounded-md hover:opacity-90">Add Review</button>
            </div>
          </div>
        </form>
    </div>
  )
}
export default AddReview