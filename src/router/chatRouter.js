import { Router } from 'express';
import { 
  getAllMessages,
  newMessage } from '../controller/chatController.js';

  const chatRouter = Router()

  chatRouter.get('/', getAllMessages)
  chatRouter.post('/', newMessage)
  
  export default chatRouter