import { maxContent } from "../../App";

function Banner() {
  return (
    <section className="px-4">
      <div className={`${maxContent} py-16 bg-gray-200 dark:bg-gray-900 dark:text-white rounded-lg`}>
        <div class="max-w-lg mx-auto text-center">
          <h1 class="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl capitalize">Eat healthy and your favourite meal! </h1>

          <p class="mt-5 md:text-lg text-gray-500 dark:text-gray-300">Welcome to our hostel. Via this website, you can order, rate and review our healthy meals. Buy a package that suits your need to enjoy more and more features.</p>

          <div class="w-full max-w-sm mx-auto mt-8 bg-white dark:bg-gray-800 border rounded-md dark:border-gray-700 focus-within:border-orange-400 focus-within:ring focus-within:ring-orange-300 dark:focus-within:border-orange-300 focus-within:ring-opacity-40 shadow-md">
            <form class="flex flex-col md:flex-row border-gray-500">
              <input type="email" placeholder="Search here" class="flex-1 h-10 px-4 py-2 m-1 text-gray-700 placeholder-gray-400 bg-transparent border-none appearance-none dark:text-gray-200 focus:outline-none focus:placeholder-transparent focus:ring-0" />

              <button type="button" class="h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-orange-600 rounded-md hover:bg-orange-400 focus:outline-none focus:bg-orange-400">Search</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;