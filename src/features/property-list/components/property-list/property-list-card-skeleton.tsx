import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@/features/core/components"

export const PropertyListCardSkeleton = () => {
  return (
    <Card className="min-h-64">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-5 w-full" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-2">
        <div className="flex flex-row gap-2">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-5 w-36" />
        </div>
        <div className="flex flex-row gap-2">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-5 w-36" />
        </div>
        <div className="mt-auto flex flex-row gap-2 font-heading text-base font-medium">
          <Skeleton className="h-5 w-28" />
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Skeleton className="h-7 w-28" />
      </CardFooter>
    </Card>
  )
}
