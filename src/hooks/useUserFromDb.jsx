import {useQuery} from '@tanstack/react-query';
import useAxios from './useAxios';
import useAuth from './useAuth';

function useUserFromDb() {
  const {axiosPrivate} = useAxios()
  const {user} = useAuth()
  const {data:userData, isPending} = useQuery({
    queryKey: ['userFromDb'],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/users/${user.email}`)
      return res.data 
    }
  })

  return {userData, isPending}
}

export default useUserFromDb;