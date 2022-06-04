import { AssetType } from '@models/asset'
import BuyButton from './BuyButton'
import { Product } from '@models/product'

interface ProductCardProps extends Product {}

export const ProductCard = (props: ProductCardProps) => {
  const { uuid, name, price, description, image_url, type } = props

  return (
    <div className="block bg-[#22252b] border-[1px] border-red rounded-lg p-2">
      <div className="flex justify-center">
        <strong className="relative h-6 px-4 text-xs leading-6 uppercase bg-black">
          {' '}
          New{' '}
        </strong>
      </div>

      <a
        href={`/products/${uuid}`}
        title={name}
        className="min-h-[280px] max-h-[280px] h-[280px]"
      >
        {type === AssetType.Image && (
          <img
            alt={name}
            src={image_url}
            className="object-cover w-full -mt-3 min-h-[280px] max-h-[280px] h-[280px]]"
          />
        )}
        {type === AssetType.Video && (
          <video
            className="clip w-full object-cover shadow-lg -mt-3 min-h-[280px] max-h-[280px] h-[280px]"
            autoPlay
            loop
            controls={false}
            muted
          >
            <source src={image_url} type="video/mp4" />
          </video>
        )}
      </a>

      <a href={`/products/${uuid}`} title={name}>
        <h5 className="mt-4 text-lg hover:underline">{name}</h5>
      </a>
      <p className="text-sm truncate">{description}</p>

      <div className="flex items-center justify-between mt-4 font-bold">
        <p className="text-lg">$ {price} USDC</p>

        <div className="text-xs tracking-wide uppercase">
          <div className="block px-2 py-1 text-sm font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring">
            <BuyButton itemID={uuid} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
