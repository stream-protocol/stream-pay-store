import fs from 'fs'
import products from './products.json'
import { v4 as uuid } from 'uuid'

export default function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      console.log('body is ', req.body)
      const { name, price, image_url, type, description, filename, hash } =
        req.body

      // Create new product ID based on last product ID
      products.push({
        uuid: uuid(),
        name,
        price,
        image_url,
        type,
        description,
        filename,
        hash,
      })
      fs.writeFileSync(
        './pages/api/products.json',
        JSON.stringify(products, null, 2)
      )
      res.status(200).send({ status: 'ok' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'error adding product' })
      return
    }
  } else {
    res.status(405).send(`Method ${req.method} not allowed`)
  }
}
