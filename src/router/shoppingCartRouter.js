import { Router } from 'express';
import { 
  getShoppingCartById, 
  newShoppingCart,
  addProductShoppingCart,
  deleteShoppingCartById,
  deleteProductShoppingCartById
} from '../controller/shoppingCartController.js';

const shoppingCartRouter = Router()

shoppingCartRouter.post('/', newShoppingCart)
shoppingCartRouter.get('/:id/productos', getShoppingCartById)
shoppingCartRouter.post('/:id/productos', addProductShoppingCart)
shoppingCartRouter.delete('/:id', deleteShoppingCartById)
shoppingCartRouter.delete('/:id/productos/:id_prod', deleteProductShoppingCartById)


export default shoppingCartRouter