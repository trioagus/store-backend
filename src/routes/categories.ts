import express from "express"
import { CategoryController } from "../controllers/category.controller"
import { isAdmin } from "../middleware/auth-middleware"

export const categoryRouter = express.Router()

const categoryController = new CategoryController()

categoryRouter.get("/", categoryController.getCategories)
categoryRouter.get("/:id", categoryController.getCategoryById)
categoryRouter.post("/", isAdmin, categoryController.createCategory)
categoryRouter.put("/:id", isAdmin, categoryController.updateCategory)
categoryRouter.delete("/:id", isAdmin, categoryController.deleteCategory)