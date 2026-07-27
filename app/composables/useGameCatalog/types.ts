export interface ICatalog {
  slug: string
  item_count: number
  name: string
  img?: string
  children?: ICatalog[]
}
