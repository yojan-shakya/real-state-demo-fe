import { API, type PaginatedResponse } from "@/lib"

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
export interface ListingItem {
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

export interface ListingDetail {
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

async function getListing() {
  const { data } = await API.get<PaginatedResponse<ListingItem>>("/listings")
  return data
}

async function getListingDetail(id: number) {
  const { data } = await API.get<ListingDetail>(`/listings/${id}`)
  return data
}

export const ListingService = {
  getListing,
  getListingDetail,
}
