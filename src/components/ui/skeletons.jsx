import { Skeleton } from "@/components/ui/skeleton";

export function HomeScreenSkeleton() {
  return (
    <div className="w-full max-w-2xl px-4 space-y-8 mx-auto">
        <div className="text-center space-y-4">
          <Skeleton className="h-[72px] w-[200px] mx-auto rounded-lg" />
          <Skeleton className="h-[28px] w-[448px] mx-auto rounded-lg" />
        </div>
        <Skeleton className="h-12 w-full rounded-full" />
        <div className="mt-16">
          <div className="flex gap-4 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-72">
                <Skeleton className="h-[104px] w-full rounded-xl" />
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="flex flex-col space-y-3 bg-white dark:bg-gray-900 rounded-lg p-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-[300px] w-full rounded-lg" />
    </div>
  );
}

export function BentoGridSkeleton() {
  return (
    <div className="grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="row-span-1 rounded-xl p-4 bg-white dark:bg-gray-900">
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}