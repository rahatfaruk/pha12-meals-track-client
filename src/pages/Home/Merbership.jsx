import { Link } from "react-router-dom";
import { Check2Circle } from "react-bootstrap-icons";
import { maxContent } from "../../App";
import SectionHeader from "../../comps/SectionHeader";

const packages = [
  {
    "name": "Silver",
    "price": 199,
    "features": [
      "Access to basic meal management system",
      "Ability to submit food reviews",
      "Limited access to premium features"
    ]
  },
  {
    "name": "Gold",
    "price": 299,
    "features": [
      "Access to advanced meal management system",
      "Priority food review submissions",
      "Access to exclusive meal plans"
    ]
  },
  {
    "name": "Platinum",
    "price": 499,
    "features": [
      "Full access to all meal management features",
      "Unlimited food review submissions",
      "Personalized meal recommendations"
    ]
  }
]

function Membership() {
  return (
    <section className="px-4 dark:text-gray-100 dark:bg-gray-900">
      <div className={`${maxContent} py-8 md:py-12`}>
        <SectionHeader title={'Membership Plan'} desc={'Choose your meal package'} />

        <div className="flex flex-wrap items-stretch">
          {packages.map(plan => (
            <div key={plan.name} className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0">
              <div className="flex flex-grow flex-col p-6 space-y-6 rounded border shadow-md sm:p-8 dark:bg-gray-700 dark:text-gray-300">
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold">{plan.name}</h4>
                  <span className="text-6xl font-bold">
                    ${plan.price}
                    <span className="text-sm tracking-wide">/month</span>
                  </span>
                </div>

                <ul className="flex-1 mb-6">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex mb-2 space-x-2">
                      <Check2Circle className="mt-1" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to={`/checkout/${plan.name.toLowerCase()}`} className="inline-block px-4 py-2 rounded-md text-white bg-orange-600 hover:opacity-90 text-center">Checkout this package</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Membership;