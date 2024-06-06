import {useParams} from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import Loading from '../../comps/Loading';
import { useQuery } from '@tanstack/react-query';
import Details from './Details';

function Checkout() {
  const {badge} = useParams()
  const {axiosPublic} = useAxios()
  const {data:packageInfo, isPending} = useQuery({
    queryKey: [badge, 'package-info'],
    queryFn: async () => {
      const res = await axiosPublic.get('/plan-packages.json')
      return res.data.find(pkg => pkg.name === badge)
    }
  })

  if(isPending) {return <Loading />}
  return (  
    <div>
      <Details badge={badge} packageInfo={packageInfo} />
      {/* TODO: stripe payment here */}
      
    </div>
  );
}

export default Checkout;