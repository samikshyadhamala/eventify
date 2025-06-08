import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BrowseEventsBanner() {
    return (
        <section className="py-16 bg-black text-primary-foreground">
            <div className="container text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Discover Amazing Events?</h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                    Join thousands of event enthusiasts and start your journey today
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/allevent" className="text-black">
                        <Button size="lg" className="text-black bg-slate-100 hover:bg-slate-200">
                            Browse Events
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}