import { maxContent } from "../../App";
import SectionHeader from "../../comps/SectionHeader";
import useAuth from "../../hooks/useAuth";
import StripeElements from "./StripeElements";

function Payment() {
  const {user} = useAuth()
  return (  
    <section className="px-4">
      <div className={`${maxContent} py-12`}>
        <SectionHeader title={'Pay With Stripe'} />
        {user ? <StripeElements user={user} /> : <p>User must logged in</p>}
      </div>
    </section>
  );
}

export default Payment;