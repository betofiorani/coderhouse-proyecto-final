import { Router } from 'express';
import { 
  getAllProducts, 
  getRandomProduct, 
  getProductById, 
  newProduct,
  updateProduct,
  deleteProductById,
  getProductForm } from '../controller/productController.js';

const productRouter = Router()

productRouter.get('/', getAllProducts)
productRouter.get('/random-product', getRandomProduct)
productRouter.get('/product-form', getProductForm)
productRouter.get('/:id', getProductById)
productRouter.post('/', newProduct)
productRouter.put('/:id', updateProduct)
productRouter.delete('/:id', deleteProductById)

export default productRouter