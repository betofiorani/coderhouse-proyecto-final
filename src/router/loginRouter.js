import { Router } from 'express';
import { login, logout } from '../controller/loginController.js';

  const loginRouter = Router()

  loginRouter.post('/', login)
  loginRouter.get('/logout', logout)
  
  export default loginRouter