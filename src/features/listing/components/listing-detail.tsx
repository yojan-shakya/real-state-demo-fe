import { DialogContent } from "@/components"
import { Badge, type BadgeVariants } from "@/components/ui/badge"
import { ListingService, type AdminMetadata } from "@/services/listing-service"
import { useQuery } from "@tanstack/react-query"
import type { ReactNode } from "react"

interface Field<D = string | number> {
  label: string
  value: D
}

interface Props {
  id: number | null
}

const PropertyDetail = ({ id }: Props) => {
  const {
    data: listingDetail,
    isLoading: isDetailLoading,
    isError: isDetailError,
  } = useQuery({
    queryKey: ["listing-detail", id],
    queryFn: () => ListingService.getListingDetail(id!),
    enabled: id !== null,
    select(data) {
      const propertyInfo: Field[] = [
        { label: "Bedrooms", value: data.bedrooms },
        { label: "Bathrooms", value: data.bathrooms },
        { label: "Suburbs", value: data.suburbs },
        { label: "Property Type", value: data.propertyType },
      ]

      const agentInfo: Field[] = [
        { label: "Name", value: data.agent.name },
        { label: "Email", value: data.agent.email },
        { label: "Phone No.", value: data.agent.phone },
      ]

      const adminInfo: Field<string | ReactNode>[] | null = data.adminMetadata
        ? [
            {
              label: "Status",
              value: (
                <Badge
                  variant={getVariantByStatus(
                    data.adminMetadata.internalStatus
                  )}
                >
                  {data.adminMetadata.internalStatus.toUpperCase()}
                </Badge>
              ),
            },
            { label: "Risk Score", value: data.adminMetadata.riskScore },
          ]
        : null

      return {
        title: data.title,
        description: data.description,
        price: data.price,
        propertyInfo,
        agentInfo,
        adminInfo,
      }
    },
  })

  const renderFields = (fields: Field<string | ReactNode>[]) => {
    return fields.map((field) => {
      return (
        <div key={field.label} className="flex justify-between space-y-2">
          <span className="font-medium text-gray-600">{field.label}</span>
          {typeof field.value === "object" ? (
            field.value
          ) : (
            <span className="text-gray-800">{field.value}</span>
          )}
        </div>
      )
    })
  }

  const getVariantByStatus = (
    status: AdminMetadata["internalStatus"]
  ): BadgeVariants["variant"] => {
    if (status === "approved") {
      return "success"
    }
    if (status === "fraud_suspected" || status === "rejected") {
      return "destructive"
    }
    return "secondary"
  }

  return (
    <DialogContent className="sm:max-w-2xl">
      <div className="no-scrollbar h-[80vh] w-full overflow-y-auto p-1">
        <h2 className="mb-2 border-b pb-1 text-lg font-semibold">
          {listingDetail?.title}
        </h2>
        <div className="space-y-4">
          <p>{listingDetail?.description}</p>
          <div className="max-w-md space-y-4">
            <p className="mt-auto flex flex-row gap-2 font-heading text-base font-medium">
              {Number(listingDetail?.price).toLocaleString("en-IN", {
                style: "currency",
                currency: "NPR",
                maximumFractionDigits: 0,
              })}
            </p>
            <div>
              <h2 className="mb-2 border-b pb-1 text-lg font-semibold">
                Property Info
              </h2>
              {renderFields(listingDetail?.propertyInfo || [])}
            </div>
            <div>
              <h2 className="mb-2 border-b pb-1 text-lg font-semibold">
                Agent Info
              </h2>
              {renderFields(listingDetail?.agentInfo || [])}
            </div>
            {listingDetail?.adminInfo ? (
              <div>
                <h2 className="mb-2 border-b pb-1 text-lg font-semibold">
                  Admin Info
                </h2>
                {renderFields(listingDetail?.adminInfo || [])}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </DialogContent>
  )
}

export default PropertyDetail
