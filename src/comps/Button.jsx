import { Link } from "react-router-dom";

function Button({children, className='', onClick, type, to}) {
  return ( <>
    {
      type === 'link' ? (
        <Link to={to} className={`inline-block px-3 py-1 rounded-md text-white bg-orange-600 hover:opacity-90 whitespace-nowrap ${className}`}>{children}</Link>
      ) : (
        <button onClick={onClick} className={`inline-block px-3 py-1 rounded-md text-white bg-orange-600 hover:opacity-90 whitespace-nowrap ${className}`}>{children}</button>
      )
    }
  </> );
}

export default Button;