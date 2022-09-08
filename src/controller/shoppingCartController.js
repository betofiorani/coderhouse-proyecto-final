import Producto from "../model/Producto.js"
import Carrito from "../model/Carrito.js"

const producto = new Producto("productos.txt")
const carrito = new Carrito("carrito.txt")

const getShoppingCartById = async (req,res) => {

  const shoppingCartId = req.params.id

  try {
    let cart = await carrito.getCartById(shoppingCartId)

    if(Array.isArray(cart)){

      const productos = await producto.getAll()
      const productosPopulados = cart[0].productos.map( prod =>{
        
        return productos.filter(p => p.id === prod.id)[0]
      })

      let shoppingCart = {...cart[0], productos: productosPopulados}
      
      res.send(shoppingCart)
    } else {
      res.send({message: `el carrito con id ${shoppingCartId} no existe`})
    }
  
  } catch (error) {
    console.log(error)
    res.sendStatus(500) 
  }
}

const newShoppingCart = async (req, res) => {
  try {
      const shoppingCartId = await carrito.create(req)
      
      res.send({shoppingCartId})
      
  } catch (error) {
      console.log(error)
      res.sendStatus(500)
  }

}

const addProductShoppingCart = async (req, res) => {

  const shoppingCartId = req.params.id
  const {productId} = req.body
  try {

    // revisamos que el producto exista
    const productById = await producto.getById(productId)
    if(Array.isArray(productById)){
      req.params.id = shoppingCartId
      let shoppingCart = await carrito.addProduct(req)

      res.send(shoppingCart)
    } else {
      res.send({message: `el producto con id ${productId} no existe`})
    }

  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const deleteShoppingCartById = async (req, res) => {
  try {
    let response = await carrito.deleteById(req)
    res.send(response)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const deleteProductShoppingCartById = async (req, res) => {
  try {
    let response = await carrito.deleteProductById(req)
    res.send(response)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

export {
  getShoppingCartById, newShoppingCart, addProductShoppingCart, 
  deleteShoppingCartById, deleteProductShoppingCartById }