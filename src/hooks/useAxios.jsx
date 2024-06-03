import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: ''
})

function useAxios() {
  return { axiosPublic }
}

export default useAxios;