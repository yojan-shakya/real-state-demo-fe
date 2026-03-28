import { DialogContent } from "@/components"
import { Skeleton } from "@/components/ui/skeleton"

export const PropertyDetailSkeleton = () => {
  return (
    <DialogContent className="sm:max-w-2xl">
      <div className="no-scrollbar h-[80vh] w-full overflow-y-auto p-1">
        <h2 className="mb-2 border-b pb-1 text-lg font-semibold">
          <Skeleton className="mb-2 h-5 w-48" />
        </h2>
        <div className="space-y-4">
          <div className="space-y-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-10/12" />
          </div>
          <div className="max-w-md space-y-4">
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
      </div>
    </DialogContent>
  )
}
