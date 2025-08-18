import { Request, Response } from 'express';

import { STATUS_CODE } from '../../enums/status.enum';
import categoryService from './category.service';

const categoryController = {
  getAllCategories: async (req: Request, res: Response) => {
    try {
      const categories = await categoryService.getAllCategories();
      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.OK,
        message: 'Categories fetched successfully',
        data: categories,
      });
    } catch (error: any) {
      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.BAD_REQUEST,
        message: error?.message || 'Failed to fetch categories',
      });
    }
  },

  getCategoryById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const category = await categoryService.getCategoryById(Number(id));
      if (!category) {
        return res.status(STATUS_CODE.OK).json({
          code: STATUS_CODE.NOT_FOUND,
          message: 'Category not found',
        });
      }
      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.OK,
        message: 'Category fetched successfully',
        data: category,
      });
    } catch (error: any) {
      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.BAD_REQUEST,
        message: error?.message || 'Failed to fetch category',
      });
    }
  },

  createCategory: async (req: Request, res: Response) => {
    try {
      const newCategory = await categoryService.createCategory(req.body);
      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.OK,
        message: 'Category created successfully',
        data: newCategory,
      });
    } catch (error: any) {
      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.BAD_REQUEST,
        message: error?.message || 'Failed to create category',
      });
    }
  },

  updateCategory: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedCategory = await categoryService.updateCategory(
        Number(id),
        req.body
      );
      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.OK,
        message: 'Category updated successfully',
        data: updatedCategory,
      });
    } catch (error: any) {
      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.BAD_REQUEST,
        message: error?.message || 'Failed to update category',
      });
    }
  },

  deleteCategory: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await categoryService.deleteCategory(Number(id));
      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.OK,
        message: 'Category deleted successfully',
      });
    } catch (error: any) {
      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.BAD_REQUEST,
        message: error?.message || 'Failed to delete category',
      });
    }
  },
};

export default categoryController;
