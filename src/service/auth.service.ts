import { prisma } from "../application/db";
import { UserRequest } from "../types/userRequest";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userValidation } from "../validation/user-validation";

export class AuthService {
  static async Register(user: UserRequest): Promise<any> {
    try {
      const validatedUser = userValidation.parse(user);
      console.log(validatedUser)
      if (!validatedUser) {
        throw new Error("Data User tidak valid");
      }

      const existingUser = await prisma.user.findFirst({
        where: {
          email: user.email,
        } ,
      });

      if (existingUser) {
        throw new Error("Email sudah digunakan");
      }

      const adminEmail = process.env.ADMIN_EMAIL;

      let role = "user";
      if (user.email === adminEmail) {
        role = "admin";
      }
      const hashedPassword = await bcrypt.hash(user.password, 10);

      const newUser = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          password: hashedPassword,
          role: role as any,
        },
      });

      return newUser;
    } catch (error: any) {
        console.log(error)
      throw new Error(`Failed to register user: ${error.message}`);
    }
  }

  static async Login(userInfo: UserRequest): Promise<any> {
    try {
      const existingUser = await prisma.user.findFirst({
        where: { email: userInfo.email },
      });

      if (!existingUser) {
        throw new Error("pengguna tidak ada");
      }

      const isValidPassword = await bcrypt.compare(
        userInfo.password,
        existingUser.password
      );

      if (!isValidPassword) {
        throw new Error("password tidak sesuai");
      }

      const payload = {
        id: existingUser.id,
        email: existingUser.email,
        phone: existingUser.phone,
        password: existingUser.password,
        role: existingUser.role,
      };

      const secret = process.env.JWT_SECRET_KEY;
      if (!secret) {
        throw new Error("Secret JWT tidak didefinisikan");
      }

      const token = jwt.sign(payload, secret, {
        expiresIn: "7d",
      });

      return {
        token: token,
        user: existingUser,
      };
    } catch (error: any) {
      throw new Error(`Failed to login user: ${error.message}`);
    }
  }

  static async Logout(res: any): Promise<any> {
    try {
      res.clearCookie("token");
      res.json({ message: "Berhasil Keluar" });
    } catch (error: any) {
      throw new Error(`Failed to logout user: ${error.message}`);
    }
  }
}
