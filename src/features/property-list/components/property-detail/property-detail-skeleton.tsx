import { Skeleton } from "@/features/core/components"

export const PropertyDetailSkeleton = () => {
  return (
    <>
      <h2 className="mb-2 border-b pb-1 text-lg font-semibold">
        <Skeleton className="mb-2 h-5 w-48" />
      </h2>
      <div className="space-y-4">
        <div className="space-y-1" key="1">
          <Skeleton className="h-4 w-full" key={1} />
          <Skeleton className="h-4 w-full" key={2} />
          <Skeleton className="h-4 w-10/12" key={3} />
        </div>
        <div className="max-w-md space-y-4" key="2">
          <div>
            <h2 className="mb-2 border-b pb-1 text-lg font-semibold">
              <Skeleton className="mb-2 h-5 w-48" />
            </h2>
            {Array.from({ length: 4 }).map(() => (
              <div className="flex justify-between space-y-4">
                <span className="font-medium text-gray-600">
                  <Skeleton className="h-4 w-48" />
                </span>
                <Skeleton className="h-4 w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
