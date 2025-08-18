import express from 'express';
import categoryController from './category.controller';
import authentication from '../../middlewares/authentication';
import { validateZod } from '../../middlewares/validate';
import { createCategory } from './category.dto';

const router = express.Router();

router.get('/', authentication, categoryController.getAllCategories);
router.get('/:id', authentication, categoryController.getCategoryById);
router.post(
  '/',
  authentication,
  validateZod(createCategory),
  categoryController.createCategory
);
router.patch(
  '/:id',
  authentication,
  validateZod(createCategory),
  categoryController.updateCategory
);
router.delete('/:id', authentication, categoryController.deleteCategory);
export default router;
