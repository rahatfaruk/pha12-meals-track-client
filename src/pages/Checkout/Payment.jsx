import { maxContent } from "../../App";
import Loading from "../../comps/Loading";
import SectionHeader from "../../comps/SectionHeader";
import useAuth from "../../hooks/useAuth";
import useUserFromDb from "../../hooks/useUserFromDb";
import StripeElements from "./StripeElements";

function Payment({badge, packageInfo}) {
  const {userData, user, isPending} = useUserFromDb()

  if (isPending) {return <Loading /> }
  return (  
    <section className="px-4">
      <div className={`${maxContent} py-12`}>
        <SectionHeader title={'Pay With Stripe'} />

        {!userData ? 
        <p className="text-center md:text-xl font-semibold">You must login </p> : (
          userData.badge === 'bronze' ? 
          <StripeElements user={user} packageInfo={packageInfo} badge={badge} /> :
          <p className="text-center md:text-xl font-semibold">You are already a premium (<span className="text-orange-600">{userData.badge}</span>) user </p>
        )}
      </div>
    </section>
  );
}

export default Payment;