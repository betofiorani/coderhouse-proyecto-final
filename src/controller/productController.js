import dao from '../DAO/index.js'

const producto = dao.ProductDao

const getAllProducts = async (req, res) => {
  
  try {
      const productos = await producto.getAll()
      res.send(productos)
      
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
      let newProduct = await producto.create(req.body)
      
      res.send(newProduct)
      
  } catch (error) {
      console.log(error)
      res.sendStatus(500)
  }

}

const updateProduct = async (req, res) => {

  const {id} = req.params
  const data = req.body 

  try {
    let products = await producto.updateById(id, data)
    res.send(products)  
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const deleteProductById = async (req, res) => {
  
  const {id} = req.params
  try {
    let products = await producto.deleteById(id)
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