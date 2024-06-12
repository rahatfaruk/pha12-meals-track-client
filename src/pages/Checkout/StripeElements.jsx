import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// hooks, comps
import useAxios from "../../hooks/useAxios";
import Loading from "../../comps/Loading";
import CheckoutForm from "./CheckoutForm";

// load stripe-promise
const stripePromise = loadStripe(import.meta.env.VITE_stripePublishKey)

function StripeElements({price}) {
  const [clientSecret, setClientSecret] = useState('')
  const {axiosPrivate} = useAxios()
  const stripeOptions = {
    clientSecret,
    appearance: {
      theme: "stripe"
    }
  }

  // ## generate client-secret-key by creating payment-intent 
  useEffect(() => {
    axiosPrivate.post('/create-payment-intent', {price})
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