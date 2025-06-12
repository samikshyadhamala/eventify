'use client'
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Banner from './Components/Banner';
import EventsContainer from './Components/EventsContainer'
import { MyEventsProvider } from "./context";
import { Separator } from "@/components/ui/separator";
export default function RegisteredEvents() {
    return (
        <MyEventsProvider>
            <Header placeholder={true} />
            <main>
                <Banner />
                <div className="flex justify-center">
                    <Separator className="w-[80%]" />
                </div>
                <EventsContainer />
            </main>
            <Footer />
        </MyEventsProvider>
    )
}