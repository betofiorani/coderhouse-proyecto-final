import dao from '../DAO/index.js'
import {environment} from '../environment/environment.js'

const producto = dao.ProductDao 
const shoppingCart = dao.ShoppingCartDao

const getShoppingCartById = async (req,res) => {

  const shoppingCartId = req.params.id

  try {

    let cart
      
    if(environment.DATABASE === "mongodb"){
      cart = await shoppingCart.getPopulateById(shoppingCartId, {path: 'productos.productoId'})
    }
    else {
      cart = await shoppingCart.getById(shoppingCartId)

      const productos = await cart[0].productos
      
      const promises = productos.map(prod => producto.getById(prod.productoId))

      const promisesResolved = await Promise.all(promises)

      const productosPopulados = promisesResolved.map(prod => ({productoId: prod[0]}))

      cart[0]._id = shoppingCartId
      cart[0].productos = productosPopulados
    }

    if(cart){
      res.send(cart)
    } else {
      res.send({message: `el shoppingCart con id ${shoppingCartId} no existe`})
    }
  
  } catch (error) {
    console.log(error)
    res.sendStatus(500) 
  }
}

const newShoppingCart = async (req, res) => {
  try {
      const response = await shoppingCart.create({})
      
      res.send({shoppingCartId: response._id})
      
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
      
      const cart = await shoppingCart.getById(shoppingCartId)
      console.log("cart", cart)
      if(cart){
        const productosCarrito = await cart[0].productos
        productosCarrito.push({productoId: productId,quantity:1})

        await shoppingCart.updateById(shoppingCartId, {productos: productosCarrito})

        const cartUpdated = {_id: cart[0]._id, productos: productosCarrito, createdAt: cart[0].createdAt, updatedAt: cart[0].updatedAt}
        res.send(cartUpdated)
      }
      else {
        res.send({message: `el carrito con id ${shoppingCartId} no existe`})
      }
      
    } else {
      res.send({message: `el producto con id ${productId} no existe`})
    }

  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const deleteShoppingCartById = async (req, res) => {

  const {id} = req.params
  console.log("desde delete", id)
  try {
    let response = await shoppingCart.deleteById(id)
    res.send(response)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const deleteProductShoppingCartById = async (req, res) => {

  const {id, id_prod} = req.params

  try {

    const cart = await shoppingCart.getById(id)
    
    if(cart){
      const productosCarrito = await cart[0].productos

      const productosFiltrados = productosCarrito.filter(producto => producto.productoId.toString() !== id_prod)
      
      await shoppingCart.updateById(id, {productos: productosFiltrados})

      const cartUpdated = {_id: cart[0]._id, productos: productosFiltrados, createdAt: cart[0].createdAt, updatedAt: cart[0].updatedAt}
      
      res.send(cartUpdated)
    }
    else {
      res.send({message: `el carrito con id ${shoppingCartId} no existe`})
    }

  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

export {
  getShoppingCartById, newShoppingCart, addProductShoppingCart, 
  deleteShoppingCartById, deleteProductShoppingCartById }