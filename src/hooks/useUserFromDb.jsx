import {useQuery} from '@tanstack/react-query';
import useAxios from './useAxios';

function useUserFromDb() {
  const {axiosPrivate} = useAxios()
  const {data:userData, isPending} = useQuery({
    queryKey: ['userFromDb'],
    queryFn: async () => {
      const res = await axiosPrivate.get('/users.json')
      return res.data[0]
    }
  })

  return {userData, isPending}
}

export default useUserFromDb;