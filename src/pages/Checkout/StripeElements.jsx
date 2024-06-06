import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";
import { toast } from "react-toastify";

// load stripe-promise
const stripePromise = loadStripe(import.meta.env.VITE_stripePublishKey)

function StripeElements() {
  const [clientSecret, setClientSecret] = useState('')
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
    axios.post('http://localhost:3000/create-payment-intent', {price})
    .then((res) => {
      setClientSecret(res.data.clientSecret);
    })
    .catch(err => {
      toast.error('Failed to generate client secret.', err.message);

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