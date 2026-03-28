import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components"
import { Skeleton } from "@/components/ui/skeleton"

export const ListingCardSkeleton = () => {
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
        <p className="mt-auto flex flex-row gap-2 font-heading text-base font-medium">
          <Skeleton className="h-5 w-28" />
        </p>
      </CardContent>
      <CardFooter className="mt-auto">
        <Skeleton className="h-7 w-28" />
      </CardFooter>
    </Card>
  )
}
