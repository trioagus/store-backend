import { prisma } from "../application/db";

export class CartService {
  static async createCart(productId: string, quantity: number): Promise<any> {
    try {
      const product = await prisma.product.findUnique({
        where: {
          id: productId,
        },
      });

      if (!product) {
        throw new Error(`Produk dengan ID ${productId} tidak ditemukan.`);
      }

      if (product.stock < quantity) {
        throw new Error(
          `Stok tidak mencukupi untuk produk dengan ID ${productId}.`
        );
      }

      const totalPrice = product.price * quantity;

      const cart = await prisma.cart.create({
        data: {
          productId,
          quantity,
          totalPrice,
        },
      });

      return cart;
    } catch (error: any) {
      throw new Error(
        `Gagal menambahkan produk ke keranjang: ${error.message}`
      );
    }
  }

  static async updateCart(cartId: string, quantity: number): Promise<any> {
    try {
      const cart = await prisma.cart.findUnique({
        where: {
          id: cartId,
        },
      });

      if (!cart) {
        throw new Error(`Keranjang dengan ID ${cartId} tidak ditemukan.`);
      }

      const product = await prisma.product.findUnique({
        where: {
          id: cart.productId,
        },
      });

      if (!product) {
        throw new Error(`Produk dengan ID ${cart.productId} tidak ditemukan.`);
      }

      const updatedQuantity = cart.quantity + quantity;
      if (updatedQuantity <= 0) {
        await prisma.cart.delete({
          where: {
            id: cartId,
          },
        });
      } else if (updatedQuantity > product.stock) {
        throw new Error(
          `Stok tidak mencukupi untuk produk dengan ID ${cart.productId}.`
        );
      } else {
        const totalPrice = product.price * updatedQuantity;

        const updatedCart = await prisma.cart.update({
          where: {
            id: cartId,
          },
          data: {
            quantity: updatedQuantity,
            totalPrice,
          },
        });

        return updatedCart;
      }
    } catch (error: any) {
      throw new Error(`Gagal memperbarui keranjang: ${error.message}`);
    }
  }

  static async deleteCart(cartId: string): Promise<any> {
    try {
      const cart = await prisma.cart.delete({
        where: {
          id: cartId,
        },
      });
      return cart;
    } catch (error: any) {
      throw new Error(`Gagal menghapus keranjang: ${error.message}`);
    }
  }

  static async getCartById(cartId: string): Promise<any> {
    try {
      const cart = await prisma.cart.findUnique({
        where: {
          id: cartId,
        },
      });
      return cart;
    } catch (error: any) {
      throw new Error(`Gagal mengambil keranjang: ${error.message}`);
    }
  }

  static async getAllCarts(): Promise<any[]> {
    try {
      const carts = await prisma.cart.findMany();
      return carts;
    } catch (error: any) {
      throw new Error(`Gagal mengambil semua keranjang: ${error.message}`);
    }
  }
}
