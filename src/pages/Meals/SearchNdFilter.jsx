import { Search } from "react-bootstrap-icons";

function SearchNdFilter({handleSubmitFilter, handleSubmitSearch, searchText, customQuery}) {
  return (  
    <div>
          {/* search */}
          <form onSubmit={handleSubmitSearch} className="mb-8 lg:mb-4">
            <div className="flex-1 flex rounded-md overflow-hidden">
              <input type="text" name="search" className="flex-1 bg-gray-200 text-gray-800 rounded-l-md min-w-0 py-1 px-3" placeholder="search product name" defaultValue={searchText} />
              <button type="submit" className="inline-block py-2 px-4 text-xl hover:opacity-80 bg-gray-400 dark:bg-gray-500 rounded-r-md"><Search/></button>
            </div>
          </form>
          {/* filter */}
          <form onSubmit={handleSubmitFilter} className="flex flex-col lg:flex-row items-start lg:items-stretch gap-4 lg:gap-12">
            <div className="flex gap-4">
              <label className="self-center">Category:</label>
              <select name="category" className="border min-w-0 px-6 py-2 rounded-md bg-gray-200  dark:bg-gray-700" defaultValue={customQuery.category || 'all'}>
                <option value="all">all</option>
                <option value="breakfast">breakfast</option>
                <option value="lunch">lunch</option>
                <option value="dinner">dinner</option>
              </select>
            </div>
            <div className="flex gap-4">
              <label className="self-center">Price Range:</label>
              <input type="text" name="priceMin" className="border min-w-0 w-24 px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 " placeholder="min" defaultValue={customQuery.priceMin} />
              <input type="text" name="priceMax" className="border min-w-0 w-24 px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700" placeholder="max" defaultValue={customQuery.priceMax} />
            </div>

            <button type="submit" className="inline-block py-1 px-4 bg-orange-600 text-white rounded-md hover:opacity-80">Filter</button>
          </form>
        </div>
  );
}

export default SearchNdFilter