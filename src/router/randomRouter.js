import { Router } from 'express';
import { getRandoms } from "../controller/randomController.js";
import logger from '../utils/logger.js';

const randomRouter = Router()
randomRouter.get('/', getRandoms)

//Rutas '*'
randomRouter.get('*', (req, res) => { logger.warn(`Ruta ${req.url} con metodo ${req.method} no implementadas en el servidor.`) })

export default randomRouter