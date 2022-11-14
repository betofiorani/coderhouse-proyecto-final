import { Router } from 'express';
import { getInfo } from '../controller/infoController.js';
import logger from '../utils/logger.js';

const infoRouter = Router()
infoRouter.get('/', getInfo)

//Rutas '*'
infoRouter.get('*', (req, res) => { logger.warn(`Ruta ${req.url} con metodo ${req.method} no implementadas en el servidor.`) })

export default infoRouter

