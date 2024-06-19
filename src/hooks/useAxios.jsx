import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from './useAuth';

const axiosPublic = axios.create({
  baseURL: 'http://localhost:3000'
})
const axiosPrivate = axios.create({
  baseURL: 'http://localhost:3000'
})

function useAxios() {
  const navigate = useNavigate()
  const {logout} = useAuth()

  // add interceptor to send auth-token in every request
  axiosPrivate.interceptors.request.use(config => {
    const token = localStorage.getItem('mt:token')
    config.headers.Authorization = token ? `Bearer ${token}` : null
    return config
  }, err => {
    return Promise.reject(err)
  })

  // response interceptor
  axiosPrivate.interceptors.response.use(response => {
    return response
  }, async err => {
    if (err.response.status === 401 || err.response.status === 403) {
      toast.error(`logged out for ${err.response.statusText}`)
      await logout()
      return navigate('/login')
    }
    return Promise.reject(err)
  })

  return { axiosPublic, axiosPrivate }
}

export default useAxios;