import { prisma } from "../application/db";
import { Request } from "express";

export class WishlistService {
  static async CreateWishlist(wishlistData: any) {
    const { userId, productId } = wishlistData;
    try {
      const createdWishlist = await prisma.wishlist.create({
        data: {
          userId,
          productId,
        },
      });
      return createdWishlist;
    } catch (error) {
      console.error(error);
      throw new Error("Terjadi kesalahan saat membuat wishlist");
    }
  }

  static async GetWishlists(req: Request) {
    try {
      if (!req.user) {
        throw new Error("User tidak ditemukan dalam request");
      }

      const userId = req.user.id;

      const wishlists = await prisma.wishlist.findMany({
        where: {
          userId: userId,
        },
      });
      return wishlists;
    } catch (error) {
      console.error(error);
      throw new Error("Terjadi kesalahan saat mendapatkan wishlist");
    }
  }

  static async GetWishlist(wishlistId: string) {
    try {
      const wishlist = await prisma.wishlist.findUnique({
        where: {
          id: wishlistId,
        },
      });
      return wishlist;
    } catch (error) {
      console.error(error);
      throw new Error("Terjadi kesalahan saat mendapatkan wishlist");
    }
  }

  static async DeleteWishlist(id: string) {
    try {
      const deletedWishlist = await prisma.wishlist.delete({
        where: {
          id: id,
        },
      });
      return deletedWishlist;
    } catch (error) {
      console.error(error);
      throw new Error("Terjadi kesalahan saat menghapus wishlist");
    }
  }
}
