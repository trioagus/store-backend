import { ProductService } from "../service/product.service";
import { Request, Response } from "express";

export class ProductController {
  async createproduct(req: Request, res: Response) {
    try {
      await ProductService.CreateProduct(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Terjadi kesalahan saat membuat produk." });
    }
  }
  async updateproduct(req: Request, res: Response) {
    const productId = req.params.id;
    try {
      await ProductService.UpdateProduct(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Terjadi kesalahan saat mengupdate produk." });
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
