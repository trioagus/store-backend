import { ShippingService } from "../service/shipping.service";
import { Request, Response } from "express";

export class ShippingController {
  async createShipping(req: Request, res: Response) {
    try {
      const shippingData = req.body;
      const createdShipping = await ShippingService.CreateShipping(
        shippingData
      );

      res.json(createdShipping);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat membuat pengiriman." });
    }
  }

  async updateShipping(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const shippingData = req.body;
      const updatedShipping = await ShippingService.UpdateShipping(
        id,
        shippingData
      );
      res.json(updatedShipping);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mengupdate pengiriman." });
    }
  }

  async deleteShipping(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedShipping = await ShippingService.DeleteShipping(id);
      res.json(deletedShipping);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat menghapus pengiriman." });
    }
  }

  async getShippings(req: Request, res: Response) {
    try {
      const shippings = await ShippingService.GetShippings();
      res.json(shippings);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mendapatkan pengiriman." });
    }
  }

  async getShipping(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const shipping = await ShippingService.GetShipping(id);
      res.json(shipping);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mendapatkan pengiriman." });
    }
  }
}
