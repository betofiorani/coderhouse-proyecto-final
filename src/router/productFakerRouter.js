import { Router } from 'express';
import { getFakerProducts } from '../controller/productController.js';
import logger from '../utils/logger.js';

const productFakerRouter = Router()

productFakerRouter.get('/:cantidad', getFakerProducts)

//Rutas '*'
productFakerRouter.get('*', (req, res) => { logger.warn(`Ruta ${req.url} con metodo ${req.method} no implementadas en el servidor.`) })

export default productFakerRouter