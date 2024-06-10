import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: 'http://localhost:3000'
})
const axiosPrivate = axios.create({
  baseURL: 'http://localhost:3000'
})

function useAxios() {
  return { axiosPublic, axiosPrivate }
}

export default useAxios;