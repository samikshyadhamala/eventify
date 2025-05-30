import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Banner from './Components/Banner';
import EventsContainer from './Components/EventsContainer'
export default function RegisteredEvents() {
    return (
        <>
            <Header placeholder={true} />
            <main>
                <Banner />
                <EventsContainer />
            </main>
            <Footer />
        </>
    )
}