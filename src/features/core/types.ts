export interface PaginatedResponse<D> {
  data: D[]
  paginationMeta: {
    total: number
    page: number
    limit: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}
