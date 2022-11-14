import { Router } from 'express';
import { 
  getAllMessages,
  newMessage } from '../controller/chatController.js';
import logger from '../utils/logger.js';

const chatRouter = Router()

chatRouter.get('/', getAllMessages)
chatRouter.post('/', newMessage)

//Rutas '*'
chatRouter.get('*', (req, res) => { logger.warn(`Ruta ${req.url} con metodo ${req.method} no implementadas en el servidor.`) })

export default chatRouter