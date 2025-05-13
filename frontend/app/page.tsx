import Carousel from "@/components/Carousel";
import Locations from "@/components/Locations";
import TrendingEvent from "@/components/TrendingEvent";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Head } from "react-day-picker";


export default function Home() {
  return (
    <div className="w-100 overflow-hidden">
      
      <Header />
      <Carousel/>
      <TrendingEvent/>
      <Locations/>
      <Footer />

    </div>
  );
}
