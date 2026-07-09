export interface ICollection {
  collection: string
  collection_icon: string
  on_sale_count: number
}

export interface ICollectionResponse {
  count: number
  data: ICollection[]
  on_sale_count: number
  success: boolean
}
