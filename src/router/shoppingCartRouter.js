import { Router } from 'express';
import { 
  getAllProducts, 
  getRandomProduct, 
  getProductById, 
  newProduct,
  updateProduct,
  deleteProductById,
  getProductForm } from '../controller/productController.js';

const shoppingCartRouter = Router()

shoppingCartRouter.get('/', getAllProducts)
shoppingCartRouter.get('/random-product', getRandomProduct)
shoppingCartRouter.get('/product-form', getProductForm)
shoppingCartRouter.get('/:id', getProductById)
shoppingCartRouter.post('/', newProduct)
shoppingCartRouter.put('/:id', updateProduct)
shoppingCartRouter.delete('/:id', deleteProductById)

export default shoppingCartRouter