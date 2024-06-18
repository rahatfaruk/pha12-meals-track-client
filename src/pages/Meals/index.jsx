import { useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { maxContent } from "../../App";
// comps
import useAxios from "../../hooks/useAxios";
import SectionHeader from "../../comps/SectionHeader";
import Loading from "../../comps/Loading";
import MealCard from "../../comps/MealCard";
import SearchNdFilter from "./SearchNdFilter";

function Meals() {
  const [searchText, setSearchText] = useState('')
  const [customQuery, setCustomQuery] = useState({})
  const {axiosPublic} = useAxios()

  const {data:meals, isPending} = useQuery({
    queryKey: ['meals', searchText, customQuery],
    queryFn: async () => {
      const params = { "params": {searchText, ...customQuery} }
      const res = await axiosPublic.get('/meals', params)
      return res.data
    }, 
  })

  const handleSubmitSearch = e => {
    e.preventDefault()
    const searchValue = e.target.search.value
    setSearchText(searchValue)
    setCustomQuery({})
  }

  // build custom query and send filter req
  const handleSubmitFilter = e => {
    e.preventDefault()

    const category = e.target.category.value
    let priceMin = (e.target.priceMin.value)
    let priceMax = (e.target.priceMax.value)

    const myQuery = {}

    if (category && category!=='all') {
      myQuery.category = category
    }
    if (priceMin && priceMax) {
      priceMin = parseFloat(priceMin)
      priceMax = parseFloat(priceMax)

      if (priceMin >= 0 && priceMax >= 0 && priceMax > priceMin) {
        myQuery.priceMin = priceMin
        myQuery.priceMax = priceMax
      } else {
        toast.error('price range is not valid!')
        return
      }
    }

    setCustomQuery(myQuery)
  }


  if(isPending) {return <Loading />}
  return (
    <section className="px-4 dark:bg-gray-900 dark:text-gray-100">
      <div className={`${maxContent} py-6 pb-12 flex-1`}>
        <SectionHeader title={'All Meals'} />

        {/* search, filter meals */}
        <SearchNdFilter handleSubmitFilter={handleSubmitFilter} handleSubmitSearch={handleSubmitSearch} searchText={searchText} customQuery={customQuery} />

        {searchText && <p className="text-center text-lg mt-6 text-gray-500">Matched with: <span className="font-semibold text-orange-600">{searchText}</span></p>}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center pt-10">
          {meals.length > 0 ? 
            meals.map(meal => <MealCard key={meal._id} meal={meal} />) :
            <p className="text-lg text-gray-500">No meals found!</p>
          }
        </div>
      </div>
    </section>
  );
}

export default Meals;