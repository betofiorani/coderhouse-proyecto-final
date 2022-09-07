import { Router } from 'express';
import { getTemplate } from '../controller/templateController.js';

  const templateRouter = Router()

  templateRouter.get('/:template', getTemplate)
  
  export default templateRouter