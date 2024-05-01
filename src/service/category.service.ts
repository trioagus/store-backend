import { prisma } from "../application/db";
import { CategoryRequest } from "../types/categoryRequest";
import { categoryValidation } from "../validation/category-validation";

export class CategoryService {
  static async GetCategories() {
    try {
      const categories = await prisma.category.findMany();
      return categories;
    } catch (error) {
      console.error(error);
      throw new Error("Terjadi kesalahan saat mengambil kategori.");
    }
  }

  static async GetCategoryById(id: string) {
    try {
      const category = await prisma.category.findUnique({
        where: { id: String(id) },
      });
      return category;
    } catch (error) {
      console.error(error);
      throw new Error("Terjadi kesalahan saat mengambil kategori.");
    }
  }

  static async CreateCategory(categoryData: CategoryRequest) {
    const { name } = categoryData;

    const validation = categoryValidation.parse(categoryData);

    if (!validation) {
      throw new Error(`Data kategori tidak valid`);
    }

    try {
      const createdCategory = await prisma.category.create({
        data: {
          name,
        },
      });
      return createdCategory;
    } catch (error) {
      console.error(error);
      throw new Error("Terjadi kesalahan saat membuat kategori.");
    }
  }

  static async UpdateCategory(id: string, categoryData: CategoryRequest) {
    const { name } = categoryData;

    const validation = categoryValidation.parse(categoryData);
    if (!validation) {
      throw new Error(`Data kategori tidak valid`);
    }

    try {
      const updatedCategory = await prisma.category.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
      return updatedCategory;
    } catch (error) {
      console.error(error);
      throw new Error("Terjadi kesalahan saat mengupdate kategori.");
    }
  }

  static async DeleteCategory(id: string) {
    try {
      const deletedCategory = await prisma.category.delete({
        where: {
          id,
        },
      });
      return deletedCategory;
    } catch (error) {
      console.error(error);
      throw new Error("Terjadi kesalahan saat menghapus kategori.");
    }
  }
}
