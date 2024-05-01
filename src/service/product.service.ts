import { prisma } from "../application/db";
import path from "path";
import fs from "fs";
import { ProductRequest } from "../types/productRequest";
import { productValidation } from "../validation/product-validation";

export class ProductService {
  static async CreateProduct(productData: ProductRequest) {
    const { name, price, categoryId, description, stock, image } = productData;

    const validation = productValidation.parse(productData);
    if (!validation) {
      throw new Error(`Data produk tidak valid`);
    }

    try {
      const createdProduct = await prisma.product.create({
        data: {
          name,
          price,
          categoryId,
          description,
          stock,
          image,
        },
      });
      return createdProduct;
    } catch (error) {
      console.error(error);
      throw new Error("Terjadi kesalahan saat membuat produk.");
    }
  }

  static async UpdateProduct(
    id: string,
    productData: ProductRequest,
    newImage?: Express.Multer.File
  ) {
    const { name, price, categoryId, description, stock } = productData;

    const validation = productValidation.parse(productData);
    if (!validation) {
      throw new Error(`Data produk tidak valid`);
    }

    try {
      let imageData: string | undefined = undefined;

      if (newImage) {
        imageData = newImage.filename;

        const oldProduct = await prisma.product.findUnique({
          where: { id },
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
        where: { id },
        data: {
          name,
          price,
          categoryId,
          description,
          stock,
          ...(imageData && { image: imageData }),
        },
      });
      return updatedProduct;
    } catch (error) {
      console.error(error);
      throw new Error("Terjadi kesalahan saat mengupdate produk.");
    }
  }

  static async GetProducts(): Promise<any> {
    try {
      const baseUrl = process.env.IMAGE_BASE_URL;
      const products = await prisma.product.findMany();

      const productsWithImage = products.map((product: any) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        categoryId: product.categoryId,
        description: product.description,
        stock: product.stock,
        image: product.image,
        imageUrl: baseUrl + product.image,
      }));

      return productsWithImage;
    } catch (error) {
      console.error(error);
      throw new Error("Terjadi kesalahan saat mengambil produk.");
    }
  }

  static async GetProductById(id: string): Promise<any> {
    try {
      const baseUrl = process.env.IMAGE_BASE_URL;
      const product = await prisma.product.findUnique({
        where: { id: String(id) },
      });

      if (!product) {
        throw new Error(`Produk dengan id ${id} tidak ditemukan.`);
      }

      const productWithImage = {
        id: product.id,
        name: product.name,
        price: product.price,
        categoryId: product.categoryId,
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
