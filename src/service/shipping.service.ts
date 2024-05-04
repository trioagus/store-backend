import { prisma } from "../application/db";
import { ShippingRequest } from "../types/shippingRequest";
import { shippingValidation } from "../validation/shipping-validation";

export class ShippingService {
  static async CreateShipping(shippingData: ShippingRequest) {
    const { city, regional, fee } = shippingData;
    const validation = shippingValidation.parse(shippingData);
    if (!validation) {
      throw new Error(`Data pengiriman tidak valid`);
    }
    try {
      const createdShipping = await prisma.shipping.create({
        data: {
          city,
          regional,
          fee,
        },
      });
      return createdShipping;
    } catch (error) {
      console.error(error);
      throw new Error("Terjadi kesalahan saat membuat pengiriman.");
    }
  }

  static async UpdateShipping(id: string, shippingData: ShippingRequest) {
    const { city, regional, fee } = shippingData;
    const validation = shippingValidation.parse(shippingData);
    if (!validation) {
      throw new Error(`Data pengiriman tidak valid`);
    }
    try {
      const updatedShipping = await prisma.shipping.update({
        where: {
          id,
        },
        data: {
          city,
          regional,
          fee,
        },
      });
      return updatedShipping;
    } catch (error) {
      console.error(error);
      throw new Error("Terjadi kesalahan saat mengupdate pengiriman.");
    }
  }

  static async DeleteShipping(id: string) {
    try {
      const deletedShipping = await prisma.shipping.delete({
        where: {
          id,
        },
      });
      return deletedShipping;
    } catch (error) {
      console.error(error);
      throw new Error("Terjadi kesalahan saat menghapus pengiriman.");
    }
  }

  static async GetShipping(id: string) {
    try {
      const shipping = await prisma.shipping.findUnique({
        where: {
          id,
        },
      });
      return shipping;
    } catch (error) {
      console.error(error);
      throw new Error("Terjadi kesalahan saat mendapatkan pengiriman.");
    }
  }

  static async GetShippings() {
    try {
      const shippings = await prisma.shipping.findMany();
      return shippings;
    } catch (error) {
      console.error(error);
      throw new Error("Terjadi kesalahan saat mendapatkan pengiriman.");
    }
  }
}
