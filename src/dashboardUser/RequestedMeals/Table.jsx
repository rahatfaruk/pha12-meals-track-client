function Table({requestedMeals}) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg dark:border">
      <table className="w-full text-sm md:text-base text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs md:text-base text-gray-700 uppercase bg-orange-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">Meal title</th>
            <th scope="col" className="px-4 py-3">Likes</th>
            <th scope="col" className="px-4 py-3">Reviews</th>
            <th scope="col" className="px-4 py-3">Status</th>
            <th scope="col" className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {requestedMeals.length < 1 ? 
          <p className="text-center py-8 px-2 text-xl font-semibold">No meals are requested!</p> :
          requestedMeals.map(rMeal => (
            <tr key={rMeal._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-orange-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th scope="row" className="px-4 py-4 font-medium text-gray-900 dark:text-white">{rMeal.title}</th>
              <td className="px-4 py-4">{rMeal.likes}</td>
              <td className="px-4 py-4 text-sm">{rMeal.reviews_count}</td>
              <td className="px-4 py-4 text-sm">{rMeal.status}</td>
              <td className="px-4 py-4 text-sm">
                <button className="inline-block px-4 py-1 rounded-md text-white bg-orange-600 hover:opacity-90">cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table