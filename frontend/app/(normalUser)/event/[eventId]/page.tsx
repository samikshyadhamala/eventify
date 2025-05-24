import Link from "next/link";
import {
  ArrowLeft,
} from "lucide-react";
import EventContent from "./Components/EventContent";

export default async function EventDetailsPage({
  params,
}: {
  params: { eventId: string };
}) {
  const eventId = params.eventId;

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-6 md:py-10">
        <div className="mb-6">
          <Link
            href="/allevent"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <EventContent eventId={eventId} />
        </div>
      </main>
    </div>
  );
}
