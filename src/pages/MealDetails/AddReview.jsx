import { useForm } from "react-hook-form"

function AddReview() {
  const { register, handleSubmit, formState: {errors: formErr} } = useForm()
  const onSubmit = async (data) => {
    console.log(data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6 border p-6 rounded-md shadow-md bg-gray-100 dark:bg-gray-800 dark:text-gray-100">
          <label className="block mb-4">
            <span className="block mb-1 text-sm text-gray-600 dark:text-gray-400">Your review</span>
            <input type="text" {...register('review', {required:true})} className="border w-full min-w-0 px-3 py-2 rounded-md bg-gray-50 shadow dark:text-gray-700" placeholder="your review text about this meal" />
            {formErr.review && <p className="text-sm text-red-500 mt-2">This field is required</p>}
          </label>
          <label className="block mb-4">
            <span className="block mb-1 text-sm text-gray-600 dark:text-gray-400">Your rating</span>
            <input type="text" {...register('rating', {required:true})} className="border w-full min-w-0 px-3 py-2 rounded-md bg-gray-50 shadow dark:text-gray-700" placeholder="e.g. 4.4" />
            {formErr.rating && <p className="text-sm text-red-500 mt-2">This field is required</p>}
          </label>
          

          <div className="mt-6">
            <button type="submit" className="bg-orange-600 text-white w-full px-4 py-2 rounded-md hover:opacity-90">Add Review</button>
          </div>
        </form>
    </div>
  )
}
export default AddReview