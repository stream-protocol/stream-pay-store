import { useEffect, useState } from 'react'

import { CreateProduct } from '../components/Products'
import Head from '../components/Head'
import Navbar from '../components/Navbar'
import type { NextPage } from 'next'
import { Product } from '@models/product'
import { ProductsCollection } from '../components/Products'
import { useWallet } from '@solana/wallet-adapter-react'

const Home: NextPage = () => {
  const { publicKey, connected } = useWallet()
  const isOwner = publicKey
    ? publicKey.toString() === process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY
    : false
  const [creating, setCreating] = useState(false)
  const [products, setProducts] = useState<Product[]>([])

  const fetchProducts = () => {
    fetch('/api/fetchProducts')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(`Failed to fetch products:`, err))
  }

  useEffect(() => {
    if (connected && publicKey) {
      fetchProducts()
    }

    if (!connected) {
      setProducts([])
    }
  }, [publicKey, connected])

  return (
    <>
      <Head />
      <div className="bg-gray-900 text-slate-200">
        <Navbar />
        <div className="container m-auto">
          {isOwner && (
            <button
              className="block m-auto px-3 py-3 text-sm font-medium text-white transition bg-lime-600 rounded-lg hover:bg-lime-700 focus:outline-none focus:ring"
              onClick={() => setCreating(!creating)}
            >
              {creating ? 'Close' : 'Create Product'}
            </button>
          )}
          {creating && <CreateProduct onProductCreated={fetchProducts} />}
          {!connected && (
            <p className="text-center">
              Connect with you wallet to see all available products
            </p>
          )}
          {!!connected && (
            <>
              <ProductsCollection category="Emojis" products={products} />
              <ProductsCollection category="Goods" products={[]} />
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Home
