import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Banner from './Components/Banner';
import EventsContainer from './Components/EventsContainer'
import { MyEventsProvider } from "./context";
export default function RegisteredEvents() {
    return (
        <MyEventsProvider>
            <Header placeholder={true} />
            <main>
                <Banner />
                <EventsContainer />
            </main>
            <Footer />
        </MyEventsProvider>
    )
}