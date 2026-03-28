import { Badge, type BadgeVariants } from "@/features/core/components"
import { useQuery } from "@tanstack/react-query"
import type { ReactNode } from "react"
import { PropertyDetailSkeleton } from "./property-detail-skeleton"
import { PropertyApi, type AdminMetadata } from "../../api"

interface Field<D = string | number> {
  label: string
  value: D
}

interface Props {
  id: number | null
}

export const PropertyDetail = ({ id }: Props) => {
  const { data: propertyDetail, isLoading: isDetailLoading } = useQuery({
    queryKey: ["property-detail", id],
    queryFn: () => PropertyApi.getPropertyDetail(id!),
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

  if (isDetailLoading) {
    return <PropertyDetailSkeleton />
  }

  return (
    <div className="no-scrollbar h-[80vh] w-full overflow-y-auto p-1">
      <h2 className="mb-2 border-b pb-1 text-lg font-semibold">
        {propertyDetail?.title}
      </h2>
      <div className="space-y-4">
        <p>{propertyDetail?.description}</p>
        <div className="max-w-md space-y-4">
          <p className="mt-auto flex flex-row gap-2 font-heading text-base font-medium">
            {Number(propertyDetail?.price).toLocaleString("en-IN", {
              style: "currency",
              currency: "NPR",
              maximumFractionDigits: 0,
            })}
          </p>
          <div>
            <h2 className="mb-2 border-b pb-1 text-lg font-semibold">
              Property Info
            </h2>
            {renderFields(propertyDetail?.propertyInfo || [])}
          </div>
          <div>
            <h2 className="mb-2 border-b pb-1 text-lg font-semibold">
              Agent Info
            </h2>
            {renderFields(propertyDetail?.agentInfo || [])}
          </div>
          {propertyDetail?.adminInfo ? (
            <div>
              <h2 className="mb-2 border-b pb-1 text-lg font-semibold">
                Admin Info
              </h2>
              {renderFields(propertyDetail?.adminInfo || [])}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
