import z from 'zod';
import { PrismaClient } from '../../generated/prisma';
import { productSchema } from './product.dto';

const prisma = new PrismaClient();

const productService = {
  createProduct: async (productData: z.infer<typeof productSchema>) => {
    try {
      const createdProduct = await prisma.products.create({
        data: productData,
      });
      return {
        id: createdProduct.id,
        name: createdProduct.name,
        description: createdProduct.description,
        price: createdProduct.price,
        stock: createdProduct.stock,
        status: createdProduct.status,
        category_id: createdProduct.category_id,
      };
    } catch (error: any) {
      throw new Error(error?.message || 'Failed to create product');
    }
  },

  getAllProducts: async () => {
    try {
      const products = await prisma.products.findMany({
        where: {
          deleted_at: null,
          category: {
            deleted_at: null,
          },
        },
        select: {
          id: true,
          name: true,
          description: true,
          status: true,
          price: true,
          stock: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return products;
    } catch (error: any) {
      throw new Error(error?.message || 'Failed to retrieve products');
    }
  },

  getProductById: async (id: number) => {
    try {
      const product = await prisma.products.findUnique({
        where: {
          id,
          deleted_at: null,
        },
        select: {
          id: true,
          name: true,
          description: true,
          status: true,
          price: true,
          stock: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return product;
    } catch (error: any) {
      throw new Error(error?.message || 'Failed to retrieve product');
    }
  },

  isProductNameUnique: async (name: string, id: number) => {
    try {
      const product = await prisma.products.findUnique({
        where: { name },
      });
      return !product || product.id === id;
    } catch (error: any) {
      throw new Error(
        error?.message || 'Failed to check product name uniqueness'
      );
    }
  },

  updateProduct: async (id: number, data: z.infer<typeof productSchema>) => {
    try {
      const updatedProduct = await prisma.products.update({
        where: { id },
        data,
      });
      return {
        id: updatedProduct.id,
        name: updatedProduct.name,
        description: updatedProduct.description,
        price: updatedProduct.price,
        stock: updatedProduct.stock,
        status: updatedProduct.status,
        category_id: updatedProduct.category_id,
      };
    } catch (error: any) {
      throw new Error(error?.message || 'Failed to update product');
    }
  },

  deleteProduct: async (id: number) => {
    try {
      await prisma.products.update({
        where: { id },
        data: { deleted_at: new Date() },
      });
    } catch (error: any) {
      throw new Error(error?.message || 'Failed to delete product');
    }
  },
};

export default productService;
