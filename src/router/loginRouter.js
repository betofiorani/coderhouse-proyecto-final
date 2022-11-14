import { Router } from 'express';
import passport from 'passport';
import { login, loginError, logout } from '../controller/loginController.js';
import logger from '../utils/logger.js';

const loginRouter = Router()

loginRouter.post('/', passport.authenticate("login", { failureRedirect: "/api/login/error" }), login)
loginRouter.get('/error', loginError)
loginRouter.get('/logout', logout)

//Rutas '*'
loginRouter.get('*', (req, res) => { logger.warn(`Ruta ${req.url} con metodo ${req.method} no implementadas en el servidor.`) })

export default loginRouter