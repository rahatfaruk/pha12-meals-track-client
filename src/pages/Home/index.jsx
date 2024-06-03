import Banner from "./Banner";
import Meals from "./Meals";

function Home() {
  return (  
    <div className="flex-1 py-8 dark:bg-gray-900 dark:text-white">
      <Banner />
      <Meals />
    </div>
  );
}

export default Home;