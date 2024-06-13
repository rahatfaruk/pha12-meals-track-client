import { useForm } from "react-hook-form";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";

const inputClass = "border w-full min-w-0 px-3 py-2 rounded-md bg-gray-50 shadow dark:text-gray-700"

function Modal({review, refetch}) {
  return (
    <dialog id={`review_edit_modal_${review._id}`} className="modal">
      <div className="modal-box">
        <AddForm review={review} refetch={refetch} />
      </div>
    </dialog>
  );
}
export default Modal;


function AddForm({review, refetch}) {
  const {axiosPrivate} = useAxios()
  const { register, handleSubmit, formState: {errors: formErr} } = useForm()

  // handle form submit
  const onSubmit = async data => {
    const updatedReview = {
      ...data,
      post_time: new Date().getTime(),
    }

    // send to db
    await axiosPrivate.patch(`/update-review/${review._id}?email=${review.reviewer_email}`, updatedReview)
    await refetch()
    toast.success('Updated the review successfully!')
    document.getElementById(`review_edit_modal_${review._id}`).close()
  }

  return (
    <form method="dialog" onSubmit={handleSubmit(onSubmit)} className="relative">
      <div>
        <h2 className="text-center text-xl">Edit review</h2>
        <button onClick={() => document.getElementById(`review_edit_modal_${review._id}`).close()} type="button" className="absolute top-1 right-1 bg-red-600 text-white px-3 py-1 rounded-md hover:opacity-90">X</button>
      </div>

      <label className="block mb-4">
        <span className="block mb-1 text-sm text-gray-600 dark:text-gray-400">Review title</span>
        <textarea {...register('review_text', { required: true })} className={`${inputClass} resize-none`} defaultValue={review.review_text}></textarea>
        {formErr.review_text && <p className="text-sm text-red-500 mt-2">This field is required</p>}
      </label>
      <label className="block mb-4">
        <span className="block mb-1 text-sm text-gray-600 dark:text-gray-400">Review rating</span>
        <input type="text" {...register('rating', { required: true, max:5, min:0 })} className={inputClass} defaultValue={review.rating} />
        {formErr.rating && <p className="text-sm text-red-500 mt-2">This field is required. max value 5</p>}
      </label>

      <div className="mt-6">
        <button type="submit" className="bg-orange-600 text-white w-full px-4 py-2 rounded-md hover:opacity-90">Update Review</button>
      </div>
    </form>
  );
}

