import { Check2Circle, HandThumbsUp, HandThumbsUpFill, StarFill } from "react-bootstrap-icons";
import { maxContent } from "../../App";
import SectionHeader from "../../comps/SectionHeader";

function Details({ badge, packageInfo }) {
  const {name, price, features} = packageInfo
  
  return (
    <section className="px-4">
      <div className={`${maxContent} pt-12 pb-6`}>
        <SectionHeader title={'Checkout'} />
        <div className="grid md:grid-cols-2 gap-6 md:gap-12">
          <figure>
            <img src={`https://dummyimage.com/600x320/ed7728/fff&text=${badge}+package`} className="w-full max-h-[400px] object-cover rounded-lg" alt="" />
          </figure>
          <div className="flex flex-grow flex-col p-6 space-y-6 rounded border shadow-md sm:p-8 dark:bg-gray-700 dark:text-gray-300">
            <div className="space-y-2">
              <h4 className="text-2xl font-bold capitalize text-orange-600">{name}</h4>
              <span className="text-6xl font-bold">
                ${price}
                <span className="text-sm tracking-wide">/month</span>
              </span>
            </div>

            <ul className="flex-1 mb-6">
              {features.map(feature => (
                <li key={feature} className="flex mb-2 space-x-2">
                  <Check2Circle className="mt-1" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Details;