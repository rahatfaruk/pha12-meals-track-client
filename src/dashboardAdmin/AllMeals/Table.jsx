import { Link } from "react-router-dom"
import Button from "../../comps/Button"
import TablePagination from "../../comps/TablePagination"

function Table(props) {
  const { meals, onDeleteMeal, ...paginationProps } = props

  if (meals.length < 1) {
    return <p className="text-center py-4 px-4 text-xl font-semibold">No meals availabe to show!</p>
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg dark:border">
      <table className="w-full text-sm md:text-base text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs md:text-base text-gray-700 uppercase bg-orange-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">Title</th>
            <th scope="col" className="px-4 py-3">Likes</th>
            <th scope="col" className="px-4 py-3">Reviews</th>
            <th scope="col" className="px-4 py-3">Distributor</th>
            <th scope="col" className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {meals.map(meal => (
            <tr key={meal._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-orange-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th className="px-4 py-4 text-sm max-w-xs">{meal.title}</th>
              <td className="px-4 py-4 text-sm max-w-xs">{meal.likes}</td>
              <td className="px-4 py-4 text-sm max-w-xs">{meal.reviews_count}</td>
              <td className="px-4 py-4 text-sm max-w-xs">{meal.admin_name}</td>
              <td className="px-4 py-4 text-sm max-w-xs flex gap-4 flex-wrap">
                <Button onClick={() => onDeleteMeal(meal._id)} className="bg-red-600">Delete</Button>
                <Button ><Link to={`/meals/${meal._id}`}>View Meal</Link></Button>
              </td>
            </tr>
          ))}
        </tbody>
        {/* pagination */}
        <TablePagination {...paginationProps}  />
      </table>
    </div>
  )
}

export default Table