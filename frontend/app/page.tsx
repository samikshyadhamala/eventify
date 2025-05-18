import Carousel from "@/components/Carousel";
import TrendingEvent from "@/components/TrendingEvent";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="w-100 overflow-hidden">
      <Header />
      <Carousel/>
      <TrendingEvent/>
      <Footer />
    </div>
  );
}
