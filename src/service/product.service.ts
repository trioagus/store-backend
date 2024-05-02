import { prisma } from "../application/db";
import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { ProductRequest } from "../types/productRequest";

export class ProductService {
  static async CreateProduct(req: Request, res: Response) {
    if (!req.file) {
      return res.status(400).json({ message: "File tidak ditemukan" });
    }

    try {
      const data: ProductRequest = {
        name: req.body.name,
        price: parseInt(req.body.price),
        description: req.body.description,
        image: req.file.filename,
        categoryId: req.body.categoryId,
        stock: parseInt(req.body.stock),
      };

      const product = await prisma.product.create({ data });

      res.status(201).json({
        code: 201,
        message: "Product created successfully",
        data: product,
      });
    } catch (error) {
      console.error("Add Product Error:", error);
      return res.status(500).send({
        message: "Internal Server Error",
      });
    }
  }

  static async UpdateProduct(req: Request, res: Response) {
    const { id } = req.params;
    const { name, price, description, categoryId, stock } = req.body;

    try {
      let imageData: string | undefined = undefined;

      if (req.file) {
        imageData = req.file.filename;
        const oldProduct = await prisma.product.findUnique({
          where: { id: String(id) },
          select: { image: true },
        });

        if (oldProduct && oldProduct.image) {
          const oldImagePath = path.join(
            __dirname,
            "..",
            "..",
            "public",
            "uploads",
            oldProduct.image
          );
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
      }

      const updatedProduct = await prisma.product.update({
        where: { id: String(id) },
        data: {
          name,
          price: parseInt(price),
          description,
          categoryId,
          stock: parseInt(stock),
          ...(imageData && { image: imageData }),
        },
      });

      res.status(200).json({
        code: 200,
        message: "Product berhasil diupdate",
        data: updatedProduct,
      });
    } catch (error) {
      console.error("gagal update:", error);
      return res.status(500).send({
        message: "Internal Server Error",
      });
    }
  }

  static async GetProducts(): Promise<any> {
    try {
      const baseUrl = process.env.IMAGE_BASE_URL;
      const productsWithCategory = await prisma.product.findMany({
        include: {
          category: true,
        },
      });

      const productsWithImageAndCategory = productsWithCategory.map(
        (product: any) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          categoryName: product.category ? product.category.name : "",
          description: product.description,
          stock: product.stock,
          image: product.image,
          imageUrl: baseUrl + product.image,
        })
      );

      return productsWithImageAndCategory;
    } catch (error) {
      console.error(error);
      throw new Error(
        "Terjadi kesalahan saat mengambil produk dengan kategori."
      );
    }
  }

  static async GetProductById(id: string): Promise<any> {
    try {
      const baseUrl = process.env.IMAGE_BASE_URL;
      const product = await prisma.product.findUnique({
        where: { id: String(id) },
        include: {
          category: true,
        },
      });

      if (!product) {
        throw new Error(`Produk dengan id ${id} tidak ditemukan.`);
      }

      const productWithImage = {
        id: product.id,
        name: product.name,
        price: product.price,
        categoryName: product.category ? product.category.name : "",
        description: product.description,
        stock: product.stock,
        image: product.image,
        imageUrl: baseUrl + product.image,
      };

      return productWithImage;
    } catch (error) {
      console.error(error);
      throw new Error("Terjadi kesalahan saat mengambil produk.");
    }
  }

  static async DeleteProduct(id: string) {
    try {
      const product = await prisma.product.findUnique({
        where: { id: String(id) },
        select: { image: true },
      });

      if (product && product.image) {
        const imagePath = path.join(
          __dirname,
          "..",
          "..",
          "public",
          "uploads",
          product.image
        );
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      const deletedProduct = await prisma.product.delete({
        where: { id: String(id) },
      });

      return deletedProduct;
    } catch (error) {
      console.error(error);
      throw new Error("Terjadi kesalahan saat menghapus produk.");
    }
  }
}
