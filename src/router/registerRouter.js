import { Router } from 'express';
import passport from 'passport';
import { register, registerError } from '../controller/loginController.js';

  const registerRouter = Router()

  registerRouter.post('/', passport.authenticate("register", { failureRedirect: "/api/registerError" }), register)
  registerRouter.get('/error', registerError)

  export default registerRouter