import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import useAuth from '../hooks/useAuth';
import useAxios from "../hooks/useAxios";

function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: {errors: formErr} } = useForm()
  const navigate = useNavigate()
  const { createUserWithEP } = useAuth()
  const {axiosPrivate} = useAxios()

  // handle form submit
  const onSubmit = async (data) => {
    // create user
    try {
      const credential = await createUserWithEP(data.email, data.password, data.name, data.photo)
      const {displayName, email} = credential.user
      // send req to create user in db
      await axiosPrivate.post(`/create-user?email=${email}`, {displayName, email})
      // get jwt token; store into ls
      const {data:jwtToken} = await axiosPublic.get(`/generate-jwt?email=${credential.user.email}`)
      localStorage.setItem('mt:token', jwtToken)
      
      toast.success('user created successfully')
      navigate('/')
    } 
    catch (err) {
      toast.error(err.message)
      console.log(err.message);      
    }
    
  }

  return (
    <section className="flex-1 px-4 py-8 dark:bg-gray-800 dark:text-gray-200">
      <div className="max-w-md mx-auto p-6 border rounded-md shadow-md">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block mb-4">
            <span className="block mb-1 text-sm text-gray-600 dark:text-gray-400">Your name</span>
            <input type="text" {...register('name', {required:true})} className="border w-full min-w-0 px-3 py-2 rounded-md bg-gray-50 shadow dark:text-gray-700" placeholder="ali" />
            {formErr.name && <p className="text-sm text-red-500 mt-2">This field is required</p>}
          </label>

          <label className="block mb-4">
            <span className="block mb-1 text-sm text-gray-600 dark:text-gray-400">Your photo url</span>
            <input type="text" {...register('photo', {required:true})} className="border w-full min-w-0 px-3 py-2 rounded-md bg-gray-50 shadow dark:text-gray-700" placeholder="http://your-image.jpg" />
            {formErr.photo && <p className="text-sm text-red-500 mt-2">This field is required</p>}
          </label>

          <label className="block mb-4">
            <span className="block mb-1 text-sm text-gray-600 dark:text-gray-400">Your email</span>
            <input type="email" {...register('email', {required:true})} className="border w-full min-w-0 px-3 py-2 rounded-md bg-gray-50 shadow dark:text-gray-700" placeholder="example@mail.com" />
            {formErr.email && <p className="text-sm text-red-500 mt-2">This field is required</p>}
          </label>

          <label className="block mb-4 relative">
            <span className="block mb-1 text-sm text-gray-600 dark:text-gray-400">Your password</span>
            <input type={showPassword ? "text" : "password"} {...register('password', {required:true, pattern: /(?=.*[a-z])(?=.*[A-Z]).{6,}/ })} className="border w-full min-w-0 px-3 py-2 rounded-md bg-gray-50 shadow dark:text-gray-700" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-8 right-1.5 p-1 text-xl">
              {showPassword ? <Eye /> : <EyeSlash />}
            </button>
            {formErr.password?.type==='required' && <p className="text-sm text-red-500 mt-2">This field is required</p>}
            {formErr.password?.type==='pattern' && <p className="text-sm text-red-500 mt-2">Password length must be at least 6 characters; contains 1 uppercase, 1 lowercase letter</p>}
          </label>

          <div className="mt-6">
            <button type="submit" className="bg-orange-600 text-white w-full px-4 py-2 rounded-md hover:opacity-90">Register account</button>
          </div>
        </form>

        <p className="mt-4">Already have an account? <Link to="/login" className="text-orange-600 hover:underline dark:text-orange-400">Login</Link></p>
      </div>
    </section>
  );
}

export default Register;