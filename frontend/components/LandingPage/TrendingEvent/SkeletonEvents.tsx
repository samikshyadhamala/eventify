import { Skeleton } from "../../ui/skeleton"

export default function SkeletonEvents() {
    return (
        <>
            <div>
            <div className="w-full justify-start rounded-none border-b bg-transparent p-0 flex gap-3">
              {["All Events", "Upcoming", "Free", "Paid"].map((tab, index) => (
                <div key={index} className="rounded-none border-b-2 border-transparent py-2">
                  <Skeleton className="h-8 w-24" />
                </div>
              ))}
            </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array(6).fill(0).map((_, index) => (
                <div key={index} className="h-full rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="block">
                    <div className='w-100 h-40'>
                      <Skeleton className="h-full w-full" />
                    </div>
                    <div className="p-4">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-2" />
                      <Skeleton className="h-4 w-2/3 mb-2" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <Skeleton className="h-9 w-full" />
                  </div>
                </div>
              ))}
            </div>
        </>
    )
}