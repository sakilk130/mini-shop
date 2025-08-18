import z from 'zod';
import { PrismaClient } from '../../generated/prisma';
import { createCategory } from './category.dto';

const prisma = new PrismaClient();

const categoryService = {
  getAllCategories: async () => {
    try {
      const categories = await prisma.categories.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          status: true,
        },
        where: {
          deleted_at: null,
        },
      });
      return categories;
    } catch (error: any) {
      throw new Error(error?.message || 'Failed to fetch categories');
    }
  },

  getCategoryById: async (id: number) => {
    try {
      const category = await prisma.categories.findUnique({
        where: { id, deleted_at: null },
        select: {
          id: true,
          name: true,
          description: true,
          status: true,
        },
      });
      return category;
    } catch (error: any) {
      throw new Error(error?.message || 'Failed to fetch category');
    }
  },

  createCategory: async (data: z.infer<typeof createCategory>) => {
    try {
      const newCategory = await prisma.categories.create({
        data,
      });
      return {
        id: newCategory.id,
        name: newCategory.name,
        description: newCategory.description,
        status: newCategory.status,
      };
    } catch (error: any) {
      throw new Error(error?.message || 'Failed to create category');
    }
  },

  updateCategory: async (id: number, data: z.infer<typeof createCategory>) => {
    try {
      const updatedCategory = await prisma.categories.update({
        where: { id, deleted_at: null },
        data,
      });
      return {
        id: updatedCategory.id,
        name: updatedCategory.name,
        description: updatedCategory.description,
        status: updatedCategory.status,
      };
    } catch (error: any) {
      throw new Error(error?.message || 'Failed to update category');
    }
  },

  deleteCategory: async (id: number) => {
    try {
      await prisma.categories.update({
        where: { id, deleted_at: null },
        data: { deleted_at: new Date() },
      });
      return true;
    } catch (error: any) {
      throw new Error(error?.message || 'Failed to delete category');
    }
  },
};

export default categoryService;
