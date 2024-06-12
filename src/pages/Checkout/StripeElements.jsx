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

function StripeElements({packageInfo, badge}) {
  const [clientSecret, setClientSecret] = useState('')
  const {axiosPrivate, axiosPublic} = useAxios()
  const {user} = useAuth()
  const stripeOptions = {
    clientSecret,
    appearance: {
      theme: "stripe"
    }
  }

  // ## generate client-secret-key by creating payment-intent 
  useEffect(() => {
    axiosPrivate.post('/create-payment-intent', {price: packageInfo.price})
    .then((res) => {
      setClientSecret(res.data.clientSecret);
    })
    .catch((err) => {
      toast.error('Failed to load payment form.');
      console.log(err.message);
    })
  }, [])

  if (!clientSecret) { <Loading/> }
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