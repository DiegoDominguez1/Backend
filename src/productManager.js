import fs from 'fs'

export default class ProductManager {
    
        constructor(path) {
            this.path = path
            this.products  = []
        }
    
        read = () => {
            if (fs.existsSync(this.path)) {
                return fs.promises.readFile(this.path, 'utf-8').then(r => JSON.parse(r))
            } else return []
        }
        
        static id = 0

        addProduct = async ({title, description, code, price, status, stock, category, thumbnail}) => {
            for (let i = 0; i < this.products.length; i++) { 
                if(this.products[i].code === code){
                return console.log(`El code ya existe ${code} `)     
                }
            }
            let laterProduct = await this.read()
            ProductManager.id++    
            let newProduct = {
                id: ProductManager.id,
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnail
            }
            if (!Object.values(newProduct).includes(undefined)){      
                this.products.push(...laterProduct, newProduct)
                await fs.promises.writeFile(this.path, JSON.stringify(this.products))     
            }else{
                console.log('Todos los campos son requeridos')
            }
                    
        }
    
        getProducts = async () => { 
            let getRespuesta = await this.read()
            console.log(getRespuesta)
        }
    
        getProductsById = async (id) => {     
            let logProduct = await this.read()
            let filtroProd = logProduct.find(producto => producto.id === id)
            return filtroProd != undefined ? filtroProd : 'Not fount'
        }
    
        deleteProductsById = async (id) => {
            let readProduct = await this.read()
            let deleteProduct = readProduct.filter(producto => producto.id != id)
            await fs.promises.writeFile(this.path, JSON.stringify(deleteProduct))
        }
    
        updateProducts = async ({id, ...producto}) => {
            await this.deleteProductById(id)
            let allProduct = await this.read()
            let modProduct =[{id, ...producto}, ...allProduct]
            await fs.promises.writeFile(this.path, JSON.stringify(modProduct))
        }
    
    }   
