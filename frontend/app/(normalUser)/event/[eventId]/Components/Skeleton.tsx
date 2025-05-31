import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
export function EventSkeleton() {
  return (
    <div className="lg:col-span-2 space-y-6">
      <div>
        <Skeleton className="h-10 w-3/4 mb-2" />
        <Skeleton className="h-6 w-20 mt-2" />
        <div className="mt-4 flex flex-col gap-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-60" />
        </div>
      </div>
      <Skeleton className="aspect-video w-full rounded-lg" />
      <div className="w-full">
        <div className="grid w-full grid-cols-2 gap-2 mb-4">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <div className="space-y-6">
      <Card className="sticky top-20">
        <CardHeader>
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
      <Card className="sticky top-20">
        <CardHeader>
          <Skeleton className="h-8 w-40 mb-1" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
