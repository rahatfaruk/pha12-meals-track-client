import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

const inputClass = "border w-full min-w-0 px-3 py-2 rounded-md bg-gray-50 shadow dark:text-gray-700"

function Modal() {
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <AddForm />
      </div>
    </dialog>
  );
}
export default Modal;


function AddForm() {
  const {user} = useAuth()
  const { register, handleSubmit, formState: {errors: formErr} } = useForm()

  // handle form submit
  const onSubmit = data => {
    const newMeal = {
      ...data,
      ingredients: data.ingredients.split(',').map(ing => ing.trim()),
      post_time: new Date().getTime(),
      likes: 0,
      reviews_count: 0,
      admin_email: user.email,
      admin_name: user.displayName
    }

    // send to db
    console.log(newMeal);
  }

  return (
    <form method="dialog" onSubmit={handleSubmit(onSubmit)} className="relative">
      <div>
        <h2 className="text-center text-xl">Add Upcoming Meal</h2>
        <button onClick={() => document.getElementById('my_modal_1').close()} type="button" className="absolute top-1 right-1 bg-red-600 text-white px-3 py-1 rounded-md hover:opacity-90">X</button>
      </div>

      <label className="block mb-4 pt-8">
        <span className="block mb-1 text-sm text-gray-600 dark:text-gray-400">Meal title</span>
        <input type="text" {...register('title', { required: true })} className={inputClass} placeholder="" />
        {formErr.title && <p className="text-sm text-red-500 mt-2">This field is required</p>}
      </label>
      <label className="block mb-4">
        <span className="block mb-1 text-sm text-gray-600 dark:text-gray-400">Meal image url</span>
        <input type="text" {...register('image', { required: true })} className={inputClass} placeholder="http://img.jpg" />
        {formErr.image && <p className="text-sm text-red-500 mt-2">This field is required</p>}
      </label>
      <label className="block mb-4">
        <span className="block mb-1 text-sm text-gray-600 dark:text-gray-400">Meal Ingredients</span>
        <input type="text" {...register('ingredients', { required: true })} className={inputClass} placeholder="tomato, ginger, garlic (comma separated)" />
        {formErr.ingredients && <p className="text-sm text-red-500 mt-2">This field is required</p>}
      </label>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-4">
        <label className="block mb-4">
          <span className="block mb-1 text-sm text-gray-600 dark:text-gray-400">Meal category</span>
          <select {...register("category", {required:true})} className={inputClass} defaultValue={""}>
            <option value="" disabled>select category</option>
            <option value="breakfast">breakfast</option>
            <option value="lunch">lunch</option>
            <option value="dinner">dinner</option>
          </select>
          {formErr.category && <p className="text-sm text-red-500 mt-2">This field is required</p>}
        </label>
        <label className="block mb-4">
          <span className="block mb-1 text-sm text-gray-600 dark:text-gray-400">Meal price (usd)</span>
          <input type="text" {...register('price', { required: true })} className={inputClass} placeholder="13.5" />
          {formErr.price && <p className="text-sm text-red-500 mt-2">This field is required</p>}
        </label>
        <label className="block mb-4">
          <span className="block mb-1 text-sm text-gray-600 dark:text-gray-400">Meal rating</span>
          <input type="text" {...register('rating', { required: true, max:5, min:0 })} className={inputClass} placeholder="" />
          {formErr.rating && <p className="text-sm text-red-500 mt-2">This field is required. max value 5</p>}
        </label>
      </div>

      <label className="block mb-4">
        <span className="block mb-1 text-sm text-gray-600 dark:text-gray-400">Meal Description</span>
        <textarea {...register('description', { required: true })} className={`${inputClass} resize-none`} />
        {formErr.description && <p className="text-sm text-red-500 mt-2">This field is required</p>}
      </label>

      <div className="mt-6">
        <button type="submit" className="bg-orange-600 text-white w-full px-4 py-2 rounded-md hover:opacity-90">Add Meal</button>
      </div>
    </form>
  );
}

