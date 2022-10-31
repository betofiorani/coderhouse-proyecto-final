import { Router } from 'express';
import passport from 'passport';
import { login, loginError, logout } from '../controller/loginController.js';

  const loginRouter = Router()

  loginRouter.post('/', passport.authenticate("login", { failureRedirect: "/api/login/error" }), login)
  loginRouter.get('/error', loginError)
  loginRouter.get('/logout', logout)
  
  export default loginRouter