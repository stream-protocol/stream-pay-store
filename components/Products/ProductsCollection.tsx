import { Product } from '@models/product'
import ProductCard from './ProductCard'

interface ProductsCollectionProps {
  category: string
  products: Product[]
}

export const ProductsCollection = (props: ProductsCollectionProps) => {
  const { category, products } = props

  return (
    <section>
      <div className="max-w-screen-xl px-4 py-8 mx-auto">
        <div>
          <span className="inline-block w-12 h-1 bg-red-400"></span>

          <h2 className="mt-1 text-2xl font-extrabold tracking-wide uppercase lg:text-3xl">
            {category}
          </h2>
        </div>

        {!products.length && (
          <p>This category does not have products for sale.</p>
        )}
        <div className="grid grid-cols-1 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
          {products.map((product: Product, idx: number) => (
            <ProductCard key={idx} {...product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductsCollection
