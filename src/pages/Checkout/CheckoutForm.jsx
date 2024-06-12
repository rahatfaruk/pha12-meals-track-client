import { useState } from "react";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router-dom";

function CheckoutForm() {
  const [message, setMessage] = useState('')
  const [trxId, setTrxId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const {badge} = useParams()
  const {user} = useAuth()
  const {axiosPrivate} = useAxios()
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async e => {
    e.preventDefault()
    
    if (!stripe || !elements) return;
    setIsLoading(true)

    // confirm payment 
    const {error, paymentIntent} = await stripe.confirmPayment({
      elements, 
      redirect: "if_required",
      confirmParams: {
        return_url: 'https://www.google.com',
        payment_method_data: {
          billing_details: {
            name: user?.displayName || 'anonymous',
            email: user?.email || 'anonymous@mail.com',
          }
        }
      }
    })
    
    if (paymentIntent?.status === 'succeeded') {
      const {amount, id, currency} = paymentIntent
       
      // my custom payment info object
      const myPaymentInfo = {
        amount: amount/100, 
        currency, 
        trx_id: id,
        email: user.email,
        created_at: new Date().getTime()
      }
      // TODO: store myPaymentInfo in db 
      await axiosPrivate.post('/store-payment-info', myPaymentInfo)
      // TODO: Assign a badge to the user in db 
      await axiosPrivate.patch(`/update-user?email=${user.email}`, {badge})

      toast.success('payment succeeded!')
      setMessage('payment succeeded!')
      setTrxId(id)
    }
    else if (error) {
      toast.error(error?.message || 'A payment error occured!')
      setMessage(error?.message || 'A payment error occured!')
      setTrxId('')
    }

    setIsLoading(false)
  }

  return (  
    <form onSubmit={handleSubmit} className="mt-4 border p-4 rounded-md shadow-md bg-gray-100">
      <PaymentElement options={{layout: "tabs"}} />

      <button 
        disabled={!stripe || !elements || isLoading} 
        className="bg-gray-800 text-white px-4 py-2 mt-6 rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed"
      >Pay now</button>
      
      <div className="mt-4 text-sm">
        {trxId && <p className="text-green-600 mb-1 font-bold">Trx id: {trxId}</p> }
        {message && <p className={`${trxId ? 'text-green-600' : 'text-red-600'} text-sm`}> {message}</p> }
      </div>
    </form>
  );
}

export default CheckoutForm;