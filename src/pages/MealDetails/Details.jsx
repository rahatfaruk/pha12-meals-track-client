import { HandThumbsUp, HandThumbsUpFill, StarFill } from "react-bootstrap-icons";
import { maxContent } from "../../App";
import SectionHeader from "../../comps/SectionHeader";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";

function Details({ meal, refetchMeal }) {
  const { _id, image, title, description, likes, post_time, ingredients, rating, admin_name, admin_email, price } = meal 
  const {user} = useAuth()
  const {axiosPrivate} = useAxios()

  const handleRequestMeal = async () => {
    if (!user) {
      toast.error('Requires login!')
      return 
    }
    const newRequestMeal = {
      meal_id: _id,
      price,
      email: user.email,
      displayName: user.displayName,
      status: 'requested'
    }
    
    // send post req
    await axiosPrivate.post('/add-requested-meal', newRequestMeal)
    toast.success('requested-meal added!')
  }

  const handleLikeBtn = async () => {
    if (!user) {
      toast.error('Requires login!')
      return 
    }
    await axiosPrivate.patch(`/inc-meal-like?email=${user.email}`, {meal_id:_id})
    refetchMeal()
  }
  
  return (
    <section className="px-4">
      <div className={`${maxContent} pt-12 pb-6`}>
        <SectionHeader title={'Details'} />
        <div className="grid md:grid-cols-2 gap-6 md:gap-12">
          <figure>
            <img src={image} className="w-full max-h-[450px] object-cover rounded-lg" alt="" />
          </figure>
          <div>
            <h3 className="text-2xl md:text-3xl mb-2">{title}</h3>
            <p className="text-gray-500 mb-4">{description}</p>
            <ul>
              <li className="flex items-center gap-4 border p-2 rounded-t-md">
                <h4 className="font-semibold min-w-24 md:w-1/3">Admin name:</h4>
                <p>{admin_name}</p>
              </li>
              <li className="flex items-center gap-4 border p-2">
                <h4 className="font-semibold min-w-24 md:w-1/3">Admin email:</h4>
                <p>{admin_email}</p>
              </li>
              <li className="flex items-center gap-4 border p-2">
                <h4 className="font-semibold min-w-24 md:w-1/3">Post time:</h4>
                <p>{new Date(post_time).toLocaleString()}</p>
              </li>
              <li className="flex items-center gap-4 border p-2">
                <h4 className="font-semibold min-w-24 md:w-1/3">Rating:</h4>
                <p className="flex items-center gap-1">{rating} <StarFill/></p>
              </li>
              <li className="flex items-center gap-4 border p-2 rounded-b-md">
                <h4 className="font-semibold min-w-24 md:w-1/3">Ingredients:</h4>
                <p className="hidden.">{ingredients.join(', ')}</p>
              </li>
            </ul>

            <div className="mt-6 flex gap-4">
              <button onClick={handleLikeBtn} className="flex items-center px-4 py-2 rounded-md text-white bg-blue-600 hover:opacity-90 text-center">
                <span className="flex items-center gap-1"><HandThumbsUp /> Like</span>
                <span className="inline-block ml-2 px-2 text-sm bg-blue-900 rounded-badge">{likes}</span>
              </button>
              <button onClick={handleRequestMeal} className="inline-block px-4 py-2 rounded-md text-white bg-orange-600 hover:opacity-90 text-center">Request This Meal</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Details;