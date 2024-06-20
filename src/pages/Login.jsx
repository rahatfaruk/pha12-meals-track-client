import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeSlash, Google } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: {errors: formErr} } = useForm()
  const navigate = useNavigate()
  const location = useLocation()
  const { signInWithEP, signInWithGoogle } = useAuth()
  const { axiosPublic, axiosPrivate } = useAxios()

  // handle form submit
  const onSubmit = async data => {
    try {
      const credential = await signInWithEP(data.email, data.password)
      // get jwt token; store into ls
      const {data:jwtToken} = await axiosPublic.get(`/generate-jwt?email=${credential.user.email}`)
      localStorage.setItem('mt:token', jwtToken)
      
      toast.success('logged in successfully!')
      navigate(location.state?.pathname || '/')
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleLoginWithGoogle = async () => {
    try {
      const credential = await signInWithGoogle()
      const {email, displayName} = credential.user
      // get user from db to check for existence. send req to create user in db if not exist to prevent from every login
      const {data:existUser} = await axiosPublic.get(`/users/${email}`)
      if (!existUser) {
        console.log('inside existUser');
        await axiosPrivate.post(`/create-user?email=${email}`, {displayName, email})
      }
      // get jwt token; store into ls
      const {data:jwtToken} = await axiosPublic.get(`/generate-jwt?email=${email}`)
      localStorage.setItem('mt:token', jwtToken)

      toast.success('logged in successfully!')
      navigate(location.state?.pathname || '/')
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <section className="flex-1 px-4 py-8 dark:bg-gray-800 dark:text-gray-200">
      <div className="max-w-md mx-auto p-6 border rounded-md shadow-md">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
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
            <button type="submit" className="bg-orange-600 text-white w-full px-4 py-2 rounded-md hover:opacity-90">Sign in</button>
          </div>
        </form>

        {/* other login method */}
        <div className="border-t pt-6 mt-6">
          <button onClick={handleLoginWithGoogle} className="bg-blue-600 text-white w-full px-4 py-2 rounded-md flex items-center justify-center gap-3 hover:opacity-90"><Google /> Continue with Google</button>
        </div>

        <p className="mt-4">Don't have an account? <Link to="/register" className="text-orange-600 hover:underline dark:text-orange-400">Register now</Link></p>
      </div>
    </section>
  );
}

export default Login;