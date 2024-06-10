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
// requestedMeals.json >> all-data
// meals.json >> title
// users.json >> email, displayName
const serveMeals = [
  {
    "_id": "1",
    "meal_id": "meal1",
    "email": "ali@mail.com",
    "status": "requested",
    // meals
    "title": "Scrambled Eggs with Bacon",
    // users
    "displayName": "ali",
  },
  {
    "_id": "2",
    "meal_id": "meal2",
    "email": "sia@mail.com",
    "status": "delivered",
    // meals
    "title": "Scrambled Eggs with Bacon",
    // users
    "displayName": "ali",
  },
]

function Table({}) {
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
          serveMeals.map(meal => <TableRow key={meal._id} meal={meal} />)}
        </tbody>
      </table>
    </div>
  )
}

export default Table

function TableRow({meal}) {
  // TODO: get user and meal based on serve email and meal_id
  return (  
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-orange-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-4 py-4 text-sm max-w-xs">{meal.title}</td>
      <td className="px-4 py-4 text-sm max-w-xs">{meal.email}</td>
      <td className="px-4 py-4 text-sm max-w-xs">{meal.displayName}</td>
      <td className="px-4 py-4 text-sm max-w-xs">{meal.status}</td>
      <td className="px-4 py-4 text-sm max-w-xs flex gap-4 flex-wrap">
        <Button >Serve</Button>
      </td>
    </tr>
  );
}
