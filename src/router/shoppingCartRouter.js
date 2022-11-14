import { Router } from 'express';
import { 
  getShoppingCartById, 
  newShoppingCart,
  addProductShoppingCart,
  deleteShoppingCartById,
  deleteProductShoppingCartById
} from '../controller/shoppingCartController.js';
import logger from '../utils/logger.js';

const shoppingCartRouter = Router()

shoppingCartRouter.post('/', newShoppingCart)
shoppingCartRouter.get('/:id/productos', getShoppingCartById)
shoppingCartRouter.post('/:id/productos', addProductShoppingCart)
shoppingCartRouter.delete('/:id', deleteShoppingCartById)
shoppingCartRouter.delete('/:id/productos/:id_prod', deleteProductShoppingCartById)

//Rutas '*'
shoppingCartRouter.get('*', (req, res) => { logger.warn(`Ruta ${req.url} con metodo ${req.method} no implementadas en el servidor.`) })

export default shoppingCartRouter