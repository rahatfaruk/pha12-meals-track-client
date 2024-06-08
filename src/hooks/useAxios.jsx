import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: ''
})
const axiosPrivate = axios.create({
  baseURL: ''
})

function useAxios() {
  return { axiosPublic, axiosPrivate }
}

export default useAxios;