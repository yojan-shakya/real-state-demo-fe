import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/features/core/components"
import { Building2, LayoutDashboardIcon, MapPin } from "lucide-react"

interface Props {
  title: string
  suburb: string
  price: string
  landSize: number
  propertyType: string
  onViewDetail: () => void
}

export const PropertyListCard = ({
  landSize,
  price,
  suburb,
  title,
  propertyType,
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
        <div className="flex flex-row gap-2">
          <Building2 className="h-4 w-4 self-center" />
          <p>{propertyType}</p>
        </div>
        <p className="mt-auto flex flex-row gap-2 font-heading text-base font-medium">
          {Number(price).toLocaleString("en-IN", {
            style: "currency",
            currency: "NPR",
            maximumFractionDigits: 0,
          })}
        </p>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button onClick={onViewDetail}>View Details</Button>
      </CardFooter>
    </Card>
  )
}
