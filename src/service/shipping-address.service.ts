import { prisma } from "../application/db";
import { ShippingAddressRequest } from "../types/shippingAddressRequest";
import { shippingAddressValidation } from "../validation/shipping-address-validation";

export class ShippingAddressService {
  static async CreateShippingAddress(shippingAddress: ShippingAddressRequest) {
    try {
      const validation = shippingAddressValidation.parse(shippingAddress);
      if (!validation) {
        throw new Error(`Data alamat pengiriman tidak valid`);
      }

      const { address, city, country, postalCode, userId } = shippingAddress;
      const newShippingAddress = await prisma.shippingAddress.create({
        data: {
          address,
          city,
          country,
          postalCode,
          userId,
        },
      });
      return newShippingAddress;
    } catch (error) {
      throw new Error("Terjadi kesalahan saat membuat alamat pengiriman");
    }
  }

  static async UpdateShippingAddress(
    id: string,
    shippingAddress: ShippingAddressRequest
  ) {
    try {
      const validation = shippingAddressValidation.parse(shippingAddress);
      if (!validation) {
        throw new Error(`Data alamat pengiriman tidak valid`);
      }

      const { address, city, country, postalCode, userId } = shippingAddress;
      const updatedShippingAddress = await prisma.shippingAddress.update({
        where: {
          id,
        },
        data: {
          address,
          city,
          country,
          postalCode,
          userId,
        },
      });
      return updatedShippingAddress;
    } catch (error) {
      throw new Error("Terjadi kesalahan saat mengupdate alamat pengiriman");
    }
  }

  static async DeleteShippingAddress(id: string) {
    try {
      const deletedShippingAddress = await prisma.shippingAddress.delete({
        where: {
          id,
        },
      });
      return deletedShippingAddress;
    } catch (error) {
      throw new Error("Terjadi kesalahan saat menghapus alamat pengiriman");
    }
  }

  static async GetShippingAddressByUserId(userId: string) {
    try {
      const shippingAddress = await prisma.shippingAddress.findMany({
        where: {
          userId,
        },
      });

      return shippingAddress;
    } catch (error) {
      throw new Error("Terjadi kesalahan saat mengambil alamat pengiriman");
    }
  }
  static async GetShippings() {
    try {
      const shippings = await prisma.shippingAddress.findMany();
      return shippings;
    } catch (error) {
      throw new Error("Terjadi kesalahan saat mengambil alamat pengiriman");
    }
  }
}
