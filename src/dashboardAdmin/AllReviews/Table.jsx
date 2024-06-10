import Button from "../../comps/Button"

// meals.json :: title, likes, review_count
// reviews.json :: review_text
const modifiedReviews = [
  {
    "_id": "rv1",
    "title": "Scrambled Eggs with Bacon",
    "likes": 45,
    "reviews_count": 0,
    "review_text": "This meal was delicious! The ingredients were fresh and perfectly cooked. I would highly recommend it.",
  },
  {
    "_id": "rv2",
    "title": "Eggs with Bacon",
    "likes": 5,
    "reviews_count": 10,
    "review_text": "The ingredients were fresh and perfectly cooked. I would highly recommend it.",
  },

]

function Table({reviews}) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg dark:border">
      <table className="w-full text-sm md:text-base text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs md:text-base text-gray-700 uppercase bg-orange-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">Meal Title</th>
            <th scope="col" className="px-4 py-3">Review text</th>
            <th scope="col" className="px-4 py-3">Likes</th>
            <th scope="col" className="px-4 py-3">Reviews</th>
            <th scope="col" className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {modifiedReviews.length < 1 ? 
          <p className="text-center py-8 px-2 text-xl font-semibold">No meals availabe to show!</p> :
          modifiedReviews.map(review => <TableRow key={review._id} review={review} />)}
        </tbody>
      </table>
    </div>
  )
}

export default Table

function TableRow({review}) {
  // TODO: get meal based on meal_id inside review 
  return (  
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-orange-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-4 py-4 text-sm max-w-xs">{review.title}</td>
      <td className="px-4 py-4 text-sm max-w-xs">{review.review_text}</td>
      <td className="px-4 py-4 text-sm max-w-xs">{review.likes}</td>
      <td className="px-4 py-4 text-sm max-w-xs">{review.reviews_count}</td>
      <td className="px-4 py-4 text-sm max-w-xs flex gap-4 flex-wrap">
        <Button className="bg-red-600">Delete</Button>
        <Button >View Meal</Button>
      </td>
    </tr>
  );
}
