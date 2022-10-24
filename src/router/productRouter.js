import { Router } from 'express';
import { 
  getAllProducts, 
  getFakerProducts,
  getProductById, 
  newProduct,
  updateProduct,
  deleteProductById,
  getProductForm } from '../controller/productController.js';
import { loginMiddleware } from '../utils/middlewares.js'

const productRouter = Router()

productRouter.get('/', loginMiddleware, getAllProducts)
productRouter.get('/product-form', getProductForm)
productRouter.get('/:id', loginMiddleware, getProductById)
productRouter.post('/', loginMiddleware, newProduct)
productRouter.put('/:id', loginMiddleware, updateProduct)
productRouter.delete('/:id', loginMiddleware, deleteProductById)

export default productRouter