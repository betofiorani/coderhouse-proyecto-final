import fs from "fs"

const path = "./archivos/"

class Carrito {
  constructor(fileName){
    this.fileName = fileName
  }
  create = async req => {

    try{

        const carts = fs.existsSync(`${path}${this.fileName}`) ? await JSON.parse(await fs.promises.readFile(`${path}${this.fileName}`, 'utf-8')) : []
        
        let maxId = 0

        carts.forEach(product => {
          maxId = product.id
          maxId > product.id ? maxId = product.id : "" 
        })

        const id = maxId + 1
        const timestamp = new Date()
        
        const newShoppingCart = {id, timestamp, productos: [] }

        carts.push(newShoppingCart)
        
        await fs.promises.writeFile(`${path}${this.fileName}`, JSON.stringify(carts, null, "\t"))
        
        return newShoppingCart.id
        
    } 
    catch(error) {
        console.log(`Ocurrió un error al crear el carrito. El error es: ${error}`)
    }
  } 
  getCartById = async id => {

    try{
      
      const carts = fs.existsSync(`${path}${this.fileName}`) ? await JSON.parse(await fs.promises.readFile(`${path}${this.fileName}`, 'utf-8')) : []        
      const cartFiltered = carts.filter(cart => cart.id == id)
      
      return cartFiltered.length > 0 ? cartFiltered : {error: `carrito con id ${id} no encontrado`}
    }
    catch (error){
        console.log(`Ocurrió un error al leer archivo. El error fue: ${error}`)
    }

  }
  
  deleteById = async req => {

    const {id} = req.params

    try {
      
      const carts = fs.existsSync(`${path}${this.fileName}`) ? await JSON.parse(await fs.promises.readFile(`${path}${this.fileName}`, 'utf-8')) : []
        
      const filterCarts = carts.filter(cart => cart.id != id)
      
      await fs.promises.unlink(`${path}${this.fileName}`)
      await fs.promises.writeFile(`${path}${this.fileName}`, JSON.stringify(filterCarts, null, "\t"))
      
      return {status: 'ok', message: `El carrito con id: ${id} fue vaciado y eliminado correctamente`}
    } 
    catch (error) {
        console.log(`Ocurrió un error al leer archivo. El error fue: ${error}`)
    }

  }

  deleteProductById = async req => {

    const {id, id_prod} = req.params

    try {
      
      const carts = fs.existsSync(`${path}${this.fileName}`) ? await JSON.parse(await fs.promises.readFile(`${path}${this.fileName}`, 'utf-8')) : []
      
      let newCart
      let filterCarts

      if(carts.filter(cart => cart.id == id).length >0) {

        filterCarts = carts.map(cart => {
          if(cart.id != id){
            return cart
          } else {
            const productsFiltered = cart.productos.filter(prod => prod.id != id_prod)
            newCart = {...cart, productos: productsFiltered}
            return newCart
          } 
        })
        
        if(newCart.productos.length === carts.filter(cart => cart.id == id)[0].productos?.length){
          return {message: `El producto con id: ${id_prod} no existe en el carrito`}
        }

      }

      else {
        return {message: `El carrito con id: ${id} es inexistente`}
      }

      await fs.promises.writeFile(`${path}${this.fileName}`, JSON.stringify(filterCarts, null, "\t"))

      return newCart
    } 
    catch (error) {
        console.log(`Ocurrió un error al leer archivo. El error fue: ${error}`)
    }

  }

  addProduct = async req =>{

    const {id} = req.params
    const {productId} = req.body

    try {
        
      const carts = fs.existsSync(`${path}${this.fileName}`) ? await JSON.parse(await fs.promises.readFile(`${path}${this.fileName}`, 'utf-8')) : []
        
        const filterCarts = carts.map(cart => {
          if(cart.id == id){
            const {productos} = cart
            // meter logica para que vaya sumando productos con cantidades

            productos.push({id: productId})
            return {...cart, productos: productos}
          }
          else {
            return cart
          }
        })

        const cartUpdated = filterCarts.filter(cart => cart.id == id)

        await fs.promises.writeFile(`${path}${this.fileName}`, JSON.stringify(filterCarts, null, "\t"))

        return cartUpdated[0]
        
      } catch (error) {
          console.log(`Ocurrio un error al leer archivo. El error fue: ${error}`)
      }
  }
}

export default Carrito