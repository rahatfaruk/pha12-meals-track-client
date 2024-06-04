import {useQuery} from '@tanstack/react-query';
import { Star } from 'react-bootstrap-icons';
import useAxios from '../../hooks/useAxios';
import { maxContent } from "../../App";
import Loading from '../../comps/Loading';
import AddReview from './AddReview';

function Reviews({meal}) {
  const {axiosPublic} = useAxios()
  const {data: reviews, isPending} = useQuery({
    queryKey: ['reviews', meal._id],
    queryFn: async () => {
      const res = await axiosPublic.get('/reviews.json')
      return res.data.filter(review => review.meal_id === meal._id)
    }
  })

  if (isPending) {
    return <Loading />
  }
  return (
    <section className="px-4">
      <div className={`${maxContent} py-6 pb-10`}>
        <h2 className="text-2xl md:text-3xl mb-3">Reviews</h2>
        <AddReview />
        <div className='grid md:grid-cols-2 gap-6'>
          {reviews.length > 0 ?
            reviews.map(review => <Review key={review._id} review={review} />) :
            <p className='text-lg text-gray-500'>No reviews available for this meal!</p>
          }
        </div>
      </div>
    </section>
  );
}

export default Reviews;

function Review({review}) {
  const {reviewer_name, reviewer_photo, posted_time, rating, review_text} = review
  return (
    <div className="flex flex-col w-full p-5 border divide-y rounded-md dark:divide-gray-300 dark:bg-gray-800 dark:text-gray-200">
      <div className="flex justify-between pb-3">
        <div className="flex space-x-4">
          <div>
            <img src={reviewer_photo} alt="" className="object-cover w-12 h-12 rounded-full border border-orange-600" />
          </div>
          <div>
            <h4 className="font-bold">{reviewer_name}</h4>
            <span className="text-xs dark:text-gray-300">{new Date(posted_time).toLocaleString()} </span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-orange-600">
          <Star className="w-5 h-5" />
          <span className="text-xl font-bold">{rating}</span>
        </div>
      </div>
      <div className="pt-3 space-y-2 text-sm dark:text-gray-300">
        <p>{review_text}</p>
      </div>
    </div>
  );
}