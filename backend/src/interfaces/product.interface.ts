export interface FindProductQuery {
  page?: number,
  limit?: number,
  search?: string,
  minPrice?: number,
  maxPrice?: number
}