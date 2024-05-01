import { Request, Response } from "express";
import { UserService } from "../service/user.service";

const userService = new UserService();

export class UserController {
  async getUsers(req: Request, res: Response) {
    try {
      const users = await userService.GetUsers();
      res.status(200).json(users);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mengambil pengguna." });
    }
  }

  async getUserById(req: Request, res: Response) {
    const userId = req.params.id;
    try {
      const user = await userService.GetUserById(userId);
      if (!user) {
        return res.status(404).json({ error: "Pengguna tidak ditemukan." });
      }
      res.status(200).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mengambil pengguna." });
    }
  }

  async updateUser(req: Request, res: Response) {
    const userId = req.params.id;
    const userData = req.body;
    try {
      const updatedUser = await userService.UpdatedUser(userId, userData);
      res.status(200).json(updatedUser);
    } catch (error: any) {
      res
        .status(500)
        .json({
          error: `Terjadi kesalahan saat mengupdate pengguna: ${error.message}`,
        });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const userId = req.params.id;
    try {
      const deletedUser = await userService.DeleteUser(userId);
      res.status(200).json(deletedUser);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat menghapus pengguna." });
    }
  }
}
