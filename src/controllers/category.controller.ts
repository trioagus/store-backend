import { CategoryService } from "../service/category.service";
import { Request, Response } from "express";

export class CategoryController {
  async getCategories(req: Request, res: Response) {
    try {
      const categories = await CategoryService.GetCategories();
      res.status(200).json(categories);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mengambil kategori." });
    }
  }

  async getCategoryById(req: Request, res: Response) {
    const categoryId = req.params.id;
    try {
      const category = await CategoryService.GetCategoryById(categoryId);
      if (!category) {
        return res.status(404).json({ error: "Kategori tidak ditemukan." });
      }
      res.status(200).json(category);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mengambil kategori." });
    }
  }

  async createCategory(req: Request, res: Response) {
    const categoryData = req.body;
    try {
      const createdCategory = await CategoryService.CreateCategory(
        categoryData
      );
      res.status(201).json(createdCategory);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat membuat kategori." });
    }
  }

  async updateCategory(req: Request, res: Response) {
    const categoryId = req.params.id;
    const categoryData = req.body;
    try {
      const updatedCategory = await CategoryService.UpdateCategory(
        categoryId,
        categoryData
      );
      res.status(200).json(updatedCategory);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mengupdate kategori." });
    }
  }

  async deleteCategory(req: Request, res: Response) {
    const categoryId = req.params.id;
    try {
      const deletedCategory = await CategoryService.DeleteCategory(categoryId);
      res.status(200).json(deletedCategory);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat menghapus kategori." });
    }
  }
}
