import { EventsProvider } from "./context"

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return (
    <EventsProvider>
      {children}
    </EventsProvider>
  )
}