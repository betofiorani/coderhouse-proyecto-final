import { Router } from 'express';
import passport from 'passport';
import { register, registerError } from '../controller/loginController.js';
import logger from '../utils/logger.js';

  const registerRouter = Router()

  registerRouter.post('/', passport.authenticate("register", { failureRedirect: "/api/registerError" }), register)
  registerRouter.get('/error', registerError)

  //Rutas '*'
  registerRouter.get('*', (req, res) => { logger.warn(`Ruta ${req.url} con metodo ${req.method} no implementadas en el servidor.`) })

  export default registerRouter