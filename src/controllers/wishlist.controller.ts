import { Request, Response } from "express";
import { WishlistService } from "../service/wishlist.service";

export class WishlistController {
  async createWishlist(req: Request, res: Response) {
    try {
      const wishlistData = req.body;
      const createdWishlist = await WishlistService.CreateWishlist(
        wishlistData
      );
      res.status(201).json(createdWishlist);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getWishlists(req: Request, res: Response) {
    try {
      const wishlists = await WishlistService.GetWishlists(req);
      res.status(200).json(wishlists);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getWishlist(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const wishlist = await WishlistService.GetWishlist(id);
      res.status(200).json(wishlist);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
  async deleteWishlist(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedWishlist = await WishlistService.DeleteWishlist(id);
      res.status(200).json(deletedWishlist);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
