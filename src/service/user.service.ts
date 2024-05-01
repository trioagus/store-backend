import { prisma } from "../application/db";
import { UserRequest } from "../types/userRequest";
import bcrypt from "bcrypt";
import { userValidation } from "../validation/user-validation";

export class UserService {
  async GetUsers() {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      console.error(error);
      throw new Error("Terjadi kesalahan saat mengambil pengguna.");
    }
  }

  async GetUserById(id: string) {
    try {
      const user = await prisma.user.findUnique({ where: { id: String(id) } });
      return user;
    } catch (error) {
      console.error(error);
      throw new Error("Terjadi kesalahan saat mengambil pengguna.");
    }
  }

  async UpdatedUser(id: string, userData: UserRequest) {
    const { name, email, phone, password } = userData;

    const validation = userValidation.parse(userData);
    if (!validation) {
      throw new Error(`Data User tidak valid`);
    }

    try {
      let updatedUser;

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updatedUser = await prisma.user.update({
          where: {
            id: id,
          },
          data: {
            name,
            email,
            phone,
            password: hashedPassword,
          },
        });
      } else {
        updatedUser = await prisma.user.update({
          where: {
            id: id,
          },
          data: {
            name,
            email,
            phone,
          },
        });
      }

      return updatedUser;
    } catch (error) {
      throw new Error(`Terjadi kesalahan saat mengupdate pengguna: ${error}`);
    }
  }

  async DeleteUser(id: string) {
    try {
      const deletedUser = await prisma.user.delete({
        where: { id: String(id) },
      });
      return deletedUser;
    } catch (error) {
      console.error(error);
      throw new Error("Terjadi kesalahan saat menghapus pengguna.");
    }
  }
}
