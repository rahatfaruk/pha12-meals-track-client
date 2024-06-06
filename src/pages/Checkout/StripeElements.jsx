import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import CheckoutForm from "./CheckoutForm";

// load stripe-promise
const stripePromise = loadStripe(import.meta.env.VITE_stripePublishKey)

function StripeElements() {
  const [clientSecret, setClientSecret] = useState('')
  const {axiosPublic} = useAxios()
  const price = 37.5

  // stripe options
  const stripeOptions = {
    clientSecret,
    appearance: {
      theme: "stripe"
    }
  }

  // ## generate client-secret-key by creating payment-intent 
  useEffect(() => {
    axiosPublic.post('/create-payment-intent', {price})
    .then((res) => {
      setClientSecret(res.data.clientSecret);
    })
    .catch((err) => {
      toast.error('Failed to load payment form.');
      console.log(err.message);
    })
  }, [])

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