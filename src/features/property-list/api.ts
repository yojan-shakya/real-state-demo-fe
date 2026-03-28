import type { PaginatedResponse } from "@/features/core"
import { api } from "@/lib"

interface Agent {
  id: number
  email: string
  phone: string
  name: string
}

export interface AdminMetadata {
  id: number
  propertyId: number
  internalStatus: "fraud_suspected" | "approved" | "rejected" | "under_review"
  riskScore: number
}
// todo remove some fields in both be and fe
export interface PropertyListItem {
  id: number
  title: string
  description: string
  price: string
  bedrooms: number
  bathrooms: number
  agentId: number
  suburbs: string
  propertyType: string
  createdAt: string
  updatedAt: string
  agent: Agent
}

export interface PropertyDetail {
  id: number
  title: string
  description: string
  price: string
  bedrooms: number
  bathrooms: number
  agentId: number
  suburbs: string
  propertyType: string
  createdAt: string
  updatedAt: string
  agent: Agent
  adminMetadata?: AdminMetadata
}

interface GetPropertyListQueryParams {
  search?: string
  priceMin?: number
  priceMax?: number
  beds?: number
  baths?: number
  propertyType?: string // todo
  suburb?: string
  page?: number
}

async function getPropertyList(params: GetPropertyListQueryParams) {
  const { data } = await api.get<PaginatedResponse<PropertyListItem>>(
    "/listings",
    {
      params,
    }
  )
  return data
}

async function getPropertyDetail(id: number) {
  const { data } = await api.get<PropertyDetail>(`/listings/${id}`)
  return data
}

export const PropertyApi = {
  getPropertyList,
  getPropertyDetail,
}
