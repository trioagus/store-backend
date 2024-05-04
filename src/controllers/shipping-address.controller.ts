import { Request, Response } from "express";
import { ShippingAddressService } from "../service/shipping-address.service";

export class ShippingAddressController {
  async createShippingAddress(req: Request, res: Response) {
    try {
      const shippingAddress = req.body;
      const newShippingAddress =
        await ShippingAddressService.CreateShippingAddress(shippingAddress);
      res.json(newShippingAddress);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat membuat alamat pengiriman." });
    }
  }

  async updateShippingAddress(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const shippingAddress = req.body;
      const updatedShippingAddress =
        await ShippingAddressService.UpdateShippingAddress(id, shippingAddress);
      res.json(updatedShippingAddress);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          error: "Terjadi kesalahan saat mengupdate alamat pengiriman.",
        });
    }
  }

  async deleteShippingAddress(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedShippingAddress =
        await ShippingAddressService.DeleteShippingAddress(id);
      res.json(deletedShippingAddress);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat menghapus alamat pengiriman." });
    }
  }

  async getShippingAddressByUserId(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const shippingAddress =
        await ShippingAddressService.GetShippingAddressByUserId(userId);
      res.json(shippingAddress);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mengambil alamat pengiriman." });
    }
  }

  async getShippings(req: Request, res: Response) {
    try {
      const shippings = await ShippingAddressService.GetShippings();
      res.json(shippings);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mengambil alamat pengiriman." });
    }
  }
}
