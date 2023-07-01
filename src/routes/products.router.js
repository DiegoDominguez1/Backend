import { Router } from 'express'
import ProductManager from '../productManager.js'

const router = Router()
const manager = new ProductManager('src/products.json')
const readProducts = manager.read()


router.get('/', async (req, res) => {
    let limit = parseInt(req.query.limit)
    if (!limit) return res.send(await readProducts)
    let allPro = await readProducts
    res.send(allPro.slice(0, limit))
})

router.get('/:pid', async (req, res) => {
    let id = parseInt(req.params.pid)
    res.send(await manager.getProductsById(id))
})

router.post('/', async (req, res) => {
    let newPro = req.body
    res.send(await manager.addProduct(newPro))
})

router.put('/:pid', async (req, res) => {
    let id = parseInt(req.params.pid)
    let updateP = req.body
    res.send(await manager.updateProduct(id, updateP))
})

router.delete('/:pid', async (req, res) => {
    let id = parseInt(req.params.pid)
    res.send(await manager.deleteProductsById(id))
})

export default router