import Button from "../../comps/Button"

function Table({reviews}) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg dark:border">
      <table className="w-full text-sm md:text-base text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs md:text-base text-gray-700 uppercase bg-orange-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">Meal title</th>
            <th scope="col" className="px-4 py-3">Likes</th>
            <th scope="col" className="px-4 py-3">Review</th>
            <th scope="col" className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length < 1 ? 
          <p className="text-center py-8 px-2 text-xl font-semibold">No review to show!</p> :
          reviews.map(review => (
            <tr key={review._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-orange-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th scope="row" className="px-4 py-4 font-medium text-gray-900 dark:text-white">{review.title}</th>
              <td className="px-4 py-4">{review.likes}</td>
              <td className="px-4 py-4 text-sm max-w-xs">{review.review_text}</td>
              <td className="px-4 py-4 text-sm flex gap-3 flex-wrap lg:flex-nowrap items-center.">
                <Button className={'!bg-blue-600'}>Edit</Button>
                <Button className={'bg-red-600'}>Delete</Button>
                <Button>View meal</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table