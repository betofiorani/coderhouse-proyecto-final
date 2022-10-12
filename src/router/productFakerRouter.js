import { Router } from 'express';
import { getFakerProducts } from '../controller/productController.js';

const productFakerRouter = Router()

productFakerRouter.get('/:cantidad', getFakerProducts)

export default productFakerRouter