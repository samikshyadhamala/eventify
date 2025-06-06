import Carousel from "@/components/Carousel";
import TrendingEvent from "@/components/LandingPage/TrendingEvent";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import EventifyFeatures from "@/components/LandingPage/EventifyFeatures";
import HowItWorksSection from "@/components/LandingPage/HowItWorksSection";
import BrowseEventBanner from "@/components/LandingPage/BrowseEventsBanner";
import NewsLetter from "@/components/LandingPage/NewsLetter";

export default function Home() {
  return (
    <div className="w-100 overflow-hidden">
      <Header />
      <Carousel />
      <TrendingEvent />
      <HowItWorksSection />
      <BrowseEventBanner />
      <EventifyFeatures />
      <NewsLetter />
      <Footer />
    </div>
  );
}