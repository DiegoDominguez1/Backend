import fs from 'fs'
import ProductManager from './productManager.js'

const productos = new ProductManager

export default class CartManager {
    
        constructor(path) {
            this.path = path
            this.cart  = []
        }
    
        readCart = () => {
            if (fs.existsSync(this.path)) {
                return fs.promises.readFile(this.path, 'utf-8').then(r => JSON.parse(r))
            } else return []
        }

        static id = 0
        

        addCart = async (id, quantity) => {
            CartManager.id++    
            let newCart = {
                id : CartManager.id,
                products: [id, quantity],
            }
            let laterCart = await this.readCart()
            this.cart.push(...laterCart, newCart)
            await fs.promises.writeFile(this.path, JSON.stringify(this.cart))       
        }      

        getCartById = async (id) => {     
            let logCart = await this.readCart()
            let filtroCart = logCart.find(cart => cart.id === id)
            return filtroCart != undefined ? filtroCart : 'Not fount'
        }
    
        addProductInCart = async (cartId, prodId) =>{
            let selecCart = await this.getCartById(cartId)
            let selecProduct = await productos.getProductsById(prodId)
            let readC = await this.readCart()
            let filterCart = readC.filter(cart => cart.id != cartId)
            
            if (selecCart.products.some(pro => pro.id === prodId)){
                let prodInCart = selecCart.products.find(pro => pro.id === prodId)
                prodInCart.quantity++
                let concatCart =[prodInCart, ...filterCart]
                await fs.promises.writeFile(this.path, JSON.stringify(concatCart))
                return "Sumando al carrito un producto ya existente"
            }
            selecCart.products.push({id : selecProduct.id, quantity : 1})
            let modCart =[selecCart, ...filterCart]
            await fs.promises.writeFile(this.path, JSON.stringify(modCart))
            return "Producto agregado al carrito"
        }
    }