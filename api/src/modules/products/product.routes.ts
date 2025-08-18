import express from 'express';
import { validateZod } from '../../middlewares/validate';
import { productSchema } from './product.dto';
import productController from './product.controller';
import authentication from '../../middlewares/authentication';

const router = express.Router();

router.post(
  '/',
  authentication,
  validateZod(productSchema),
  productController.create
);
router.get('/', authentication, productController.getAllProducts);
router.get('/:id', authentication, productController.getProductById);

export default router;
