import Producto from '../model/Producto.js'
import Chat from '../model/Chat.js'

const producto = new Producto("productos.txt")
const chat = new Chat("chat.txt")

const getAllProducts = async (req, res) => {
  
  try {
      const productos = await producto.getAll()
      res.send(productos)
      
  } catch (error) {
      console.log(error)
      res.sendStatus(500)
  }
}

const getRandomProduct = async (req, res) => {
  try {
    const product = await producto.getRamdomProduct()
    res.send(product)  
  } catch (error) {
    console.log(error)
    res.sendStatus(500) 
  }
}

const getProductById = async (req,res) => {

  const {id} = req.params

  try {
    let products = await producto.getById(id)
    res.send(products)  
  } catch (error) {
    console.log(error)
    res.sendStatus(500) 
  }
}

const newProduct = async (req, res) => {
  
  try {
      let newProduct = await producto.save(req)
      
      res.send(newProduct)
      
  } catch (error) {
      console.log(error)
      res.sendStatus(500)
  }

}

const updateProduct = async (req, res) => {
  try {
    let products = await producto.modifyById(req)
    res.send(products)  
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const deleteProductById = async (req, res) => {
  try {
    let products = await  producto.deleteById(req)
    res.send(products)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const getProductForm = (req,res) => {
  
  const {io} = req

  try {
    res.render('form.ejs',{productos: productos})
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const getFakerProducts = async (req, res) => {
  
  try {
      const productos = await producto.getAll()
      res.send(productos)
      
  } catch (error) {
      console.log(error)
      res.sendStatus(500)
  }
}

export {
  getAllProducts, getProductById, getFakerProducts,
  newProduct, updateProduct, deleteProductById, getProductForm}