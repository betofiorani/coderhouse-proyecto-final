import { Router } from 'express';
import { getInfo } from '../controller/infoController.js';

const infoRouter = Router()
infoRouter.get('/', getInfo)

export default infoRouter

