import { Request, Response } from 'express';
import { STATUS_CODE } from '../../enums/status.enum';
import productService from './product.service';
import categoryService from '../categories/category.service';

const productController = {
  create: async (req: Request, res: Response) => {
    try {
      const productData = req.body;
      const findcategory = await categoryService.getCategoryById(
        productData?.category_id
      );

      if (!findcategory) {
        return res.status(STATUS_CODE.OK).json({
          code: STATUS_CODE.NOT_FOUND,
          message: 'Category not found',
        });
      }

      const newProduct = await productService.createProduct(productData);
      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.OK,
        message: 'Product created successfully',
        data: newProduct,
      });
    } catch (error) {
      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.BAD_REQUEST,
        message: 'Error creating product',
      });
    }
  },

  getAllProducts: async (req: Request, res: Response) => {
    try {
      const products = await productService.getAllProducts();
      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.OK,
        message: 'Products retrieved successfully',
        data: products,
      });
    } catch (error) {
      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.BAD_REQUEST,
        message: 'Error retrieving products',
      });
    }
  },

  getProductById: async (req: Request, res: Response) => {
    try {
      const product = await productService.getProductById(
        Number(req.params.id)
      );
      if (!product) {
        return res.status(STATUS_CODE.OK).json({
          code: STATUS_CODE.NOT_FOUND,
          message: 'Product not found',
        });
      }
      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.OK,
        message: 'Product retrieved successfully',
        data: product,
      });
    } catch (error) {
      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.BAD_REQUEST,
        message: 'Error retrieving product',
      });
    }
  },
};

export default productController;
