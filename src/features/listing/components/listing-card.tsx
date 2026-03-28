import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components"
import { LayoutDashboardIcon, MapPin } from "lucide-react"

interface Props {
  title: string
  suburb: string
  price: string
  landSize: number
  onViewDetail: () => void
}

export const ListingCard = ({
  landSize,
  price,
  suburb,
  title,
  onViewDetail,
}: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-2">
        <div className="flex flex-row gap-2">
          <MapPin className="h-4 w-4 self-center" />
          <p>{suburb}</p>
        </div>
        <div className="flex flex-row gap-2">
          <LayoutDashboardIcon className="h-4 w-4 self-center" />
          <p>
            {landSize} {"sq. meters"}
          </p>
        </div>
        <div className="mt-auto flex flex-row gap-2 font-heading text-base font-medium">
          <p>NPR</p>
          <p>{price}</p>
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button onClick={onViewDetail}>View Details</Button>
      </CardFooter>
    </Card>
  )
}
