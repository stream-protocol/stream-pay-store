import { AssetType } from './asset'

export interface Product {
  uuid: string
  name: string
  price: string
  description: string
  image_url: string
  type: AssetType
  filename: string
  hash: string
}
