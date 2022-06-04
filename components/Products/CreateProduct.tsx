import { create } from 'ipfs-http-client'
import { useState } from 'react'

const client = create({ url: 'https://ipfs.infura.io:5001/api/v0' })

interface CreateProductProps {
  onProductCreated: () => void
}

export const CreateProduct = (props: CreateProductProps) => {
  const { onProductCreated } = props

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image_url: '',
    type: 'image', // matches defaultValue in select element
    description: '',
  })
  const [file, setFile] = useState<any>({})
  const [uploading, setUploading] = useState(false)

  async function onChange(e: any) {
    setUploading(true)
    const files = e.target.files
    try {
      console.log(files[0])
      const added = await client.add(files[0])
      setFile({ filename: files[0].name, hash: added.path })
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
    setUploading(false)
  }

  const createProduct = async () => {
    try {
      // Combine product data and file.name
      const product = { ...newProduct, ...file }
      console.log('Sending product to api:', product)
      const response = await fetch('../api/addProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
      const data = await response.json()
      if (response.status === 200) {
        alert('Product added!')
        onProductCreated()
      } else {
        alert(`Unable to add product: ${data.error}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto mt-8 mb-0 space-y-4">
        <header className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Create Product</h1>
        </header>

        <div className="max-w-md mx-auto mt-8 mb-0 space-y-4 text-gray-700">
          <div>
            <label htmlFor="fileName" className="sr-only">
              Product File
            </label>

            <div className="relative">
              <input
                type="file"
                id="fileName"
                name="fileName"
                className="block w-full text-sm text-lime-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-lime-50 file:text-lime-700 hover:file:bg-lime-100"
                accept=".png,.jpg,.jpeg,.mp4,.gif"
                placeholder="Select File"
                onChange={onChange}
              />
              {file.name != null && (
                <p className="file-name">{file.filename}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="productName" className="sr-only">
              Product Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="productName"
                name="productName"
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter product name"
                onChange={(e) => {
                  setNewProduct({ ...newProduct, name: e.target.value.trim() })
                }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="price" className="sr-only">
              Price (USDC)
            </label>
            <div className="relative">
              <input
                type="number"
                min={0.0000001}
                id="price"
                name="price"
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter Price"
                onChange={(e) => {
                  setNewProduct({ ...newProduct, price: e.target.value.trim() })
                }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="url" className="sr-only">
              Product URL
            </label>
            <div className="relative">
              <input
                type="text"
                id="url"
                name="url"
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Image URL ex: https://i.imgur.com/yip6Ilu.jpg"
                onChange={(e) => {
                  setNewProduct({
                    ...newProduct,
                    image_url: e.target.value.trim(),
                  })
                }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="assetType" className="sr-only">
              Asset Type
            </label>
            <div className="relative">
              <select
                id="assetType"
                name="assetType"
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Image URL ex: https://i.imgur.com/yip6Ilu.jpg"
                onChange={(e) => {
                  setNewProduct({
                    ...newProduct,
                    type: e.target.value,
                  })
                }}
              >
                <option value="image" defaultValue="image">
                  Image
                </option>
                <option value="video">Video</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="sr-only">
              Description
            </label>
            <div className="relative">
              <input
                type="text"
                id="description"
                name="description"
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Product description"
                onChange={(e) => {
                  setNewProduct({
                    ...newProduct,
                    description: e.target.value.trim(),
                  })
                }}
              />
            </div>
          </div>
        </div>

        <div>
          <button
            className="block m-auto px-3 py-3 text-sm font-medium text-white transition bg-lime-600 rounded-lg hover:bg-lime-700 focus:outline-none focus:ring"
            onClick={() => {
              createProduct()
            }}
            disabled={
              uploading ||
              !newProduct.name ||
              !newProduct.description ||
              !newProduct.image_url ||
              !newProduct.price
            }
          >
            Create Product
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateProduct
