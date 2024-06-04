import { StarFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

function MealCard({meal}) {
  const {_id, image, title, rating, price, category} = meal
  return (
    <div className="max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <figure className="relative">
        <img src={image} className="w-full h-60 rounded-t-lg object-cover" alt="" />
        <span className="absolute top-4 left-4 flex gap-1.5 items-center bg-orange-100 text-orange-800 font-semibold px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-800"> <StarFill /> {rating} </span>
      </figure>
      <div className="px-6 py-4">
        <h3 className="mb-1 text-2xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="mb-2">Category: {category}</p>
        <div className="flex justify-between gap-4 items-center">
          <p className="text-xl font-semibold text-orange-600 ">${price}</p>
          <Link to={`/meal/${_id}`} className="inline-block px-4 py-1 rounded-md text-white bg-orange-600 hover:opacity-90">Details</Link>
        </div>
      </div>
    </div>
  );
}
export default MealCard