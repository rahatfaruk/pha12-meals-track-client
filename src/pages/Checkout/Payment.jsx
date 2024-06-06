import { maxContent } from "../../App";
import SectionHeader from "../../comps/SectionHeader";
import StripeElements from "./StripeElements";

function Payment() {
  return (  
    <section className="px-4">
      <div className={`${maxContent} py-12`}>
        <SectionHeader title={'Pay With Stripe'} />
        <StripeElements />
      </div>
    </section>
  );
}

export default Payment;