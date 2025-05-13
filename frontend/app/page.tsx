import Header from "./Header";
import Carousel from "./Components/Carousel";
import Footer from "./Footer";
import Locations from "./Components/Locations";
import TrendingEvent from "./Components/TrendingEvent";
import Upcomming from "./Components/Upcomming";


export default function Home() {
  return (
    <div className="">
      <Carousel/>
      <TrendingEvent/>
      <Locations/>
    </div>
  );
}
