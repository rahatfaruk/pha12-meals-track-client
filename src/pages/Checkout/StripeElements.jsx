import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// hooks, comps
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Loading from "../../comps/Loading";
import CheckoutForm from "./CheckoutForm";

// load stripe-promise
const stripePromise = loadStripe(import.meta.env.VITE_stripePublishKey)

function StripeElements() {
  const [clientSecret, setClientSecret] = useState('')
  const {axiosPrivate, axiosPublic} = useAxios()
  const {user} = useAuth()
  const stripeOptions = {
    clientSecret,
    appearance: {
      theme: "stripe"
    }
  }
  
  const { data:price, isPending } = useQuery({
    queryKey: ['requested-meals', user.email],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/requested-meals/${user.email}`)
      const totalPrice = res.data.reduce((total, rMeal) => (total + rMeal.price), 0)
      return totalPrice
    }
  })  

  // ## generate client-secret-key by creating payment-intent 
  useEffect(() => {
    if (!price) {return}

    axiosPrivate.post('/create-payment-intent', {price})
    .then((res) => {
      setClientSecret(res.data.clientSecret);
    })
    .catch((err) => {
      toast.error('Failed to load payment form.');
      console.log(err.message);
    })
  }, [price])

  if (!clientSecret || isPending) { <Loading/> }
  return (  
    <div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={stripeOptions} >
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default StripeElements;