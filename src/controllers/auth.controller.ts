import { AuthService } from "../service/auth.service";
import { Request, Response } from "express";

export class AuthController {
  register = async (req: Request, res: Response) => {
    try {
      const user = req.body;
      const newUser = await AuthService.Register(user);
      res.json(newUser);
    } catch (error: any) {
        console.log(error)
      res.json({ message: error.message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const user = req.body;
      const loginUser = await AuthService.Login(user);
      res.json(loginUser);
    } catch (error: any) {
      res.json({ message: error.message });
    }
  };

  logout = async (req: Request, res: Response) => {
    try {
      await AuthService.Logout(res);
    } catch (error: any) {
      res.json({ message: error.message });
    }
  };
}
