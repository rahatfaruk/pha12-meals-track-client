import { maxContent } from "../../App";
import SectionHeader from "../../comps/SectionHeader";

const offers = [
  {
    "title": "Healthy Food",
    "details": "Nutritious meals prepared by expert chefs. Fresh ingredients sourced locally. Customizable meal plans for dietary needs",
    "icon": "healthy_food_icon.png"
  },
  {
    "title": "3 Times Service",
    "details": "Breakfast, lunch, and dinner served daily. Consistent meal timings for student convenience. Flexible options for meal scheduling",
    "icon": "three_times_service_icon.png"
  },
  {
    "title": "Instant Delivery",
    "details": "Efficient delivery system for timely service. Quick response to student meal requests. Real-time tracking of meal delivery status",
    "icon": "instant_delivery_icon.png"
  }
]

function WhatWeOffer() {
  return (
    <section className="px-4 dark:bg-gray-800 dark:text-gray-100">
      <div className={`${maxContent} py-8 md:py-12`}>
        <SectionHeader title={'What We Offer'} desc={'Here is some of our benefits you will get from us'} />

        <div className="grid md:gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-8">
            {offers.map(offer => (
              <div key={offer.title} className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 rounded-md dark:bg-orange-600 dark:text-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium leading-6 dark:text-gray-100">{offer.title}</h4>
                  <p className="mt-2 dark:text-gray-400">{offer.details}</p>
                </div>
              </div>

            ))}
          </div>
          <figure aria-hidden="true" className="mt-10 lg:mt-0">
            <img src="https://i.postimg.cc/50Q0p2BC/food-service.jpg" alt="" className="w-full h-[400px] md:h-[550px] object-cover object-center rounded-lg shadow-lg dark:bg-gray-500" />
          </figure>
        </div>
      </div>
    </section>
  );
}

export default WhatWeOffer;