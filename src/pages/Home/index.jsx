import Banner from "./Banner";
import Meals from "./Meals";
import Membership from "./Membership";
import WhatWeOffer from "./WhatWeOffer";

function Home() {
  return (  
    <div className="flex-1 py-8 dark:bg-gray-900 dark:text-white">
      <Banner />
      <Meals />
      <WhatWeOffer />
      {/* <Membership /> */}
    </div>
  );
}

export default Home;