import {useParams} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import Loading from '../../comps/Loading';
import Details from './Details';
import Payment from './Payment';

function Checkout() {
  const {badge} = useParams()
  const {axiosPublic} = useAxios()
  const {data:packageInfo, isPending} = useQuery({
    queryKey: [badge, 'package-info'],
    queryFn: async () => {
      const res = await axiosPublic.get(`/pricing-plan?badge=${badge}`)
      return res.data 
    }
  })

  if(isPending) {return <Loading />}
  return (  
    <div>
      <Details badge={badge} packageInfo={packageInfo} />
      <Payment badge={badge} packageInfo={packageInfo} />
    </div>
  );
}

export default Checkout;