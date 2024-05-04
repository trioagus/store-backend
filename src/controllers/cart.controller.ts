import { Request, Response } from "express";
import { CartService } from "../service/cart.service";

export class CartController {
  async addToCart(req: Request, res: Response) {
    try {
      const { productId, quantity } = req.body;
      const cart = await CartService.createCart(productId, quantity);
      res.status(201).json(cart);
    } catch (error: any) {
      res.status(500).json({ message: `gagal membuat keranjang: ${error.message}` });
    }
  }

  async updateCart(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { quantity } = req.body;
      
      const cart = await CartService.getCartById(id);
      if (!cart) {
        return res.status(404).json({ message: `Keranjang dengan ID ${id} tidak ditemukan.` });
      }
      
      const updatedCart = await CartService.updateCart(id, quantity);
      res.status(200).json(updatedCart);
    } catch (error: any) {
      res.status(500).json({ message: `Gagal memperbarui keranjang: ${error.message}` });
    }
  }

  async deleteCart(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const cart = await CartService.deleteCart(id);
      res.status(200).json(cart);
    } catch (error: any) {
      res.status(500).json({ message: `Gagal menghapus keranjang: ${error.message}` });
    }
  }
  

  async getCarts(req: Request, res: Response) {
    try {
      const carts = await CartService.getAllCarts();
      res.status(200).json(carts);
    } catch (error: any) {
      res.status(500).json({ message: `gagal mengambil keranjang: ${error.message}` });
    }
  }

  async getCartById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const cart = await CartService.getCartById(id);
      res.status(200).json(cart);
    } catch (error: any) {
      res.status(500).json({ message: `gagal mengambil keranjang: ${error.message}` });
    }
  }
}
