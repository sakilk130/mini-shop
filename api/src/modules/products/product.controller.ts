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
    } catch (error: any) {
      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.BAD_REQUEST,
        message: error?.message || 'Error creating product',
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
    } catch (error: any) {
      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.BAD_REQUEST,
        message: error?.message || 'Error retrieving products',
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
    } catch (error: any) {
      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.BAD_REQUEST,
        message: error?.message || 'Error retrieving product',
      });
    }
  },

  updateProduct: async (req: Request, res: Response) => {
    try {
      const productId = Number(req.params.id);
      const productData = req.body;

      const findProduct = await productService.getProductById(productId);
      if (!findProduct) {
        return res.status(STATUS_CODE.OK).json({
          code: STATUS_CODE.NOT_FOUND,
          message: 'Product not found',
        });
      }

      const isNameUnique = await productService.isProductNameUnique(
        productData.name,
        productId
      );
      if (!isNameUnique) {
        return res.status(STATUS_CODE.OK).json({
          code: STATUS_CODE.CONFLICT,
          message: 'Product name must be unique',
        });
      }

      const updatedProduct = await productService.updateProduct(
        productId,
        productData
      );

      if (!updatedProduct) {
        return res.status(STATUS_CODE.OK).json({
          code: STATUS_CODE.NOT_FOUND,
          message: 'Product not found',
        });
      }

      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.OK,
        message: 'Product updated successfully',
        data: updatedProduct,
      });
    } catch (error: any) {
      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.BAD_REQUEST,
        message: error?.message || 'Error updating product',
      });
    }
  },

  deleteProduct: async (req: Request, res: Response) => {
    try {
      const productId = Number(req.params.id);
      const findProduct = await productService.getProductById(productId);
      if (!findProduct) {
        return res.status(STATUS_CODE.OK).json({
          code: STATUS_CODE.NOT_FOUND,
          message: 'Product not found',
        });
      }

      await productService.deleteProduct(productId);
      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.OK,
        message: 'Product deleted successfully',
      });
    } catch (error: any) {
      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.BAD_REQUEST,
        message: error?.message || 'Error deleting product',
      });
    }
  },
};

export default productController;
