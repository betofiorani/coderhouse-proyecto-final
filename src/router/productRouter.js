import { Router } from 'express';
import { 
  getAllProducts, 
  getFakerProducts,
  getProductById, 
  newProduct,
  updateProduct,
  deleteProductById,
  getProductForm } from '../controller/productController.js';
import { validAdmin } from '../utils/middlewares.js'

const productRouter = Router()

productRouter.get('/', getAllProducts)
productRouter.get('/product-form', getProductForm)
productRouter.get('/:id', getProductById)
productRouter.post('/', validAdmin, newProduct)
productRouter.put('/:id', validAdmin, updateProduct)
productRouter.delete('/:id', validAdmin, deleteProductById)

export default productRouter