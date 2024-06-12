import { Link } from "react-router-dom";
import { Check2Circle } from "react-bootstrap-icons";
import { useQuery } from "@tanstack/react-query";
// comps
import useAxios from "../../hooks/useAxios";
import { maxContent } from "../../App";
import SectionHeader from "../../comps/SectionHeader";
import Loading from "../../comps/Loading";


function Membership() {
  const {axiosPublic} = useAxios()
  const {data:packages, isPending} = useQuery({
    queryKey: ['all-pricing-plan'],
    queryFn: async () => {
      const res = await axiosPublic.get('/pricing-plan')
      return res.data
    }
  })

  if(isPending) {return <Loading />}
  return (
    <section className="px-4 dark:text-gray-100 dark:bg-gray-900">
      <div className={`${maxContent} py-8 md:py-12`}>
        <SectionHeader title={'Membership Plan'} desc={'Choose your meal package'} />

        <div className="flex flex-wrap items-stretch">
          {packages.map(pkg => (
            <div key={pkg.name} className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0">
              <div className="flex flex-grow flex-col p-6 space-y-6 rounded border shadow-md sm:p-8 dark:bg-gray-700 dark:text-gray-300">
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold capitalize text-orange-600">{pkg.name}</h4>
                  <span className="text-6xl font-bold">
                    ${pkg.price}
                    <span className="text-sm tracking-wide">/month</span>
                  </span>
                </div>

                <ul className="flex-1 mb-6">
                  {pkg.features.map(feature => (
                    <li key={feature} className="flex mb-2 space-x-2">
                      <Check2Circle className="mt-1" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to={`/checkout/${pkg.name.toLowerCase()}`} className="inline-block px-4 py-2 rounded-md text-white bg-orange-600 hover:opacity-90 text-center">Checkout this package</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Membership;