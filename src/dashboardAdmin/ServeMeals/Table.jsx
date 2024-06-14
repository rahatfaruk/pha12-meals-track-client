import Button from "../../comps/Button"

function Table({serveMeals, onServeMeal}) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg dark:border">
      <table className="w-full text-sm md:text-base text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs md:text-base text-gray-700 uppercase bg-orange-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">Meal Title</th>
            <th scope="col" className="px-4 py-3">Email</th>
            <th scope="col" className="px-4 py-3">Username</th>
            <th scope="col" className="px-4 py-3">Status</th>
            <th scope="col" className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {serveMeals.length < 1 ? 
          <p className="text-center py-8 px-2 text-xl font-semibold">No reviews availabe to show!</p> :
          serveMeals.map(meal => <TableRow key={meal._id} meal={meal} onServeMeal={onServeMeal} />)}
        </tbody>
      </table>
    </div>
  )
}

export default Table

function TableRow({meal, onServeMeal}) {
  return (  
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-orange-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-4 py-4 text-sm max-w-xs">{meal.title}</td>
      <td className="px-4 py-4 text-sm max-w-xs">{meal.email}</td>
      <td className="px-4 py-4 text-sm max-w-xs">{meal.displayName}</td>
      <td className="px-4 py-4 text-sm max-w-xs">{meal.status}</td>
      <td className="px-4 py-4 text-sm max-w-xs flex gap-4 flex-wrap">
        {meal.status === 'delivered' ? 
          <p>Served</p> :
          <Button onClick={() => onServeMeal(meal._id)}>Serve</Button>
        }
      </td>
    </tr>
  );
}
