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
import logger from '../utils/logger.js';

const productRouter = Router()

productRouter.get('/', loginMiddleware, getAllProducts)
productRouter.get('/product-form', getProductForm)
productRouter.get('/:id', loginMiddleware, getProductById)
productRouter.post('/', loginMiddleware, newProduct)
productRouter.put('/:id', loginMiddleware, updateProduct)
productRouter.delete('/:id', loginMiddleware, deleteProductById)

//Rutas '*'
productRouter.get('*', (req, res) => { logger.warn(`Ruta ${req.url} con metodo ${req.method} no implementadas en el servidor.`) })

export default productRouter