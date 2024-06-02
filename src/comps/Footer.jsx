import { Facebook, Instagram, Linkedin } from "react-bootstrap-icons";
import { maxContent } from "../App";

function Footer() {
  return (
    <footer className="px-4 bg-gray-100 dark:bg-gray-700 dark:text-gray-100 border-t dark:border-gray-500">
      <div className={`${maxContent} flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0`}>
        <div className="lg:w-1/3 flex gap-2 items-center">
          <figure className="w-8">
            <img src="/logo.svg" className="w-full" />
          </figure>
          <h1 className='text-2xl text-orange-600'>MealTrack</h1>
        </div>

        <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase dark:text-gray-100 font-semibold">Product</h3>
            <ul className="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#">Features</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">Integrations</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">FAQ</a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase dark:text-gray-100 font-semibold">Company</h3>
            <ul className="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#">Privacy</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">Terms of Service</a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="uppercase dark:text-gray-100 font-semibold">Developers</h3>
            <ul className="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#">Public API</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">Documentation</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">Guides</a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <div className="uppercase dark:text-gray-100 font-semibold">Social media</div>
            <div className="flex justify-start space-x-3">
              <a href="#" className="inline-block text-blue-800 dark:text-blue-600 hover:opacity-80">
                <Facebook className="size-9 p-1" />
              </a>
              <a href="#" className="inline-block text-sky-600 dark:text-sky-500 hover:opacity-80">
                <Linkedin className="size-9 p-1" />
              </a>
              <a href="#" className="inline-block text-red-800 hover:opacity-80">
                <Instagram className="size-9 p-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={`${maxContent} py-6 space-y-2 text-sm text-center dark:text-gray-300 border-t`}>
        <p>© 2024. All rights reserved.</p>
        <p>Developed by <span className="font-bold">Rahat Faruk</span></p>
      </div>
    </footer>
  );
}

export default Footer;