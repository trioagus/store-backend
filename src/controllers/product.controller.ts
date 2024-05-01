import { ProductService } from "../service/product.service";
import { Request, Response } from "express";

export class ProductController {
  async createproduct(req: Request, res: Response) {
    const productData = req.body;

    try {
      const createdProduct = await ProductService.CreateProduct(productData);
      res.status(201).json(createdProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Terjadi kesalahan saat membuat produk." });
    }
  }

  async updateproduct(req: Request, res: Response) {
    const productId = req.params.id;
    const productData = req.body;

    try {
      const updatedProduct = await ProductService.UpdateProduct(
        productId,
        productData
      );
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat memperbarui produk." });
    }
  }

  async deleteproduct(req: Request, res: Response) {
    const productId = req.params.id;
    try {
      await ProductService.DeleteProduct(productId);
      res.status(200).json({ message: "Produk berhasil dihapus." });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat menghapus produk." });
    }
  }

  async getproducts(req: Request, res: Response) {
    try {
      const products = await ProductService.GetProducts();
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mengambil produk." });
    }
  }

  async getproductbyid(req: Request, res: Response) {
    const productId = req.params.id;
    try {
      const product = await ProductService.GetProductById(productId);
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mengambil produk." });
    }
  }
}
