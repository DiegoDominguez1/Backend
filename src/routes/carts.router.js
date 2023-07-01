import { Router } from 'express'
import CartManager from '../cartManager.js'


const router = Router()
const cartManager = new CartManager('src/cart.json')

router.get('/', async (req, res) => {
    res.send(await cartManager.readCart())
})

router.post('/', async (req, res) => {
    let newCa = req.body
    res.send(await cartManager.addCart(newCa))
})

router.get('/:cid', async (req, res) => {
    let id = parseInt(req.params.cid)
    res.send(await cartManager.getCartById(id))
})
router.post('/:cid/product/:pid', async (req, res) => {
    let proId = parseInt(req.params.pid)
    let cartId = parseInt(req.params.cid)
    res.send(await cartManager.addProductInCart(cartId, proId))
})

export default router