import { useRef } from "react";
import { Search } from "react-bootstrap-icons";

function SearchForm({myQuery, setMyQuery}) {
  const usernameRef = useRef(null)
  const emailRef = useRef(null)

  const handleSearch = async (searchType) => {
    const newQuery = {}
    if (searchType === 'username') {
      newQuery[searchType] = usernameRef.current.value
    } else if (searchType === 'email') {
      newQuery[searchType] = emailRef.current.value
    }

    setMyQuery(newQuery)
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col md:flex-row gap-6 mb-6">
      <div className="flex-1 flex bg-gray-200 dark:bg-gray-600 rounded-md">
        <input type="text" name="username" ref={usernameRef} className="flex-1 bg-transparent min-w-0 py-1 px-3" placeholder="search by username" defaultValue={myQuery.username || ''} />
        <button type="button" onClick={() => handleSearch('username')} className="inline-block py-2 px-3 text-xl hover:opacity-80 bg-gray-300 rounded-r-md dark:bg-gray-700"><Search /></button>
      </div>
      <div className="flex-1 flex bg-gray-200 dark:bg-gray-600 rounded-md">
        <input type="text" name="email" ref={emailRef} className="flex-1 bg-transparent min-w-0 py-1 px-3" placeholder="search by email" defaultValue={myQuery.email || ''} />
        <button type="button" onClick={() => handleSearch('email')} className="inline-block py-2 px-3 text-xl hover:opacity-80 bg-gray-300 rounded-r-md dark:bg-gray-700"><Search /></button>
      </div>
    </form>
  );
}

export default SearchForm;