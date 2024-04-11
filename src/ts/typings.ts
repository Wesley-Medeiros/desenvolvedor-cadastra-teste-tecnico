export interface Filter {
  price_lte?: number,
  price_gte?: number,
  color?: string[],
  size_like?: string[],
  _sort?: string,
  _order?: 'desc' | 'asc'
}

export interface Produto {
  id: string,
  name: string,
  price: number,
  parcelamento: number[],
  color: string,
  image: string,
  sizes: string[],
  date: string
}