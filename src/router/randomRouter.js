import { Router } from 'express';
import { getRandoms } from "../controller/randomController.js";

const randomRouter = Router()
randomRouter.get('/', getRandoms)

export default randomRouter