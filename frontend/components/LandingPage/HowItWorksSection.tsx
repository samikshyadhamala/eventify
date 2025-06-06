export default function HowItWorksSection() {
    return (
        <section className="py-16 bg-muted/50 px-12">
            <div className="container text-black">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Getting started is simple. Follow these easy steps to join amazing events
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-primary-foreground text-xl font-bold mb-4">
                            1
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Browse Events</h3>
                        <p className="text-muted-foreground">
                            Explore our curated selection of events across various categories and locations
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-primary-foreground text-xl font-bold mb-4">
                            2
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Register Easily</h3>
                        <p className="text-muted-foreground">
                            Quick and secure registration process with multiple payment options
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-primary-foreground text-xl font-bold mb-4">
                            3
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Enjoy the Event</h3>
                        <p className="text-muted-foreground">
                            Attend your event with digital tickets and connect with other attendees
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}