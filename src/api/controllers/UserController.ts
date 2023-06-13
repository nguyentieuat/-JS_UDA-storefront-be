import { Router, Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { authToken } from "../middlewares/auth";
import { UserReturnType, UserCreatedReturnType } from "../interface/Interfaces";

export const UserController: Router = Router();
const user: User = new User();

// select all users
UserController.get(
  "/",
  authToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allUsers: UserReturnType[] = await user.getUsers();
      return res.json(allUsers);
    } catch (err) {
      next(err);
    }
  }
);

// select user by id
UserController.get(
  "/:id",
  authToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: number = parseInt(req.params.id);
      const userById: UserReturnType = await user.getUserById(userId);
      return res.json(userById);
    } catch (err) {
      next(err);
    }
  }
);

// create a user
UserController.post(
  "/",
  authToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isAuth:boolean = true;
      const newUser: UserCreatedReturnType = await user.createUser(req.body, isAuth);
      return res.json(newUser);
    } catch (err) {
      next(err);
    }
  }
);

// create a user
UserController.put(
  "/:id",
  authToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isAuth:boolean = true;
      const newUser: UserReturnType = await user.updateUser(parseInt(req.params.id), req.body);
      return res.json(newUser);
    } catch (err) {
      next(err);
    }
  }
);

// delete a user by id
UserController.delete(
  "/:id",
  authToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: number = parseInt(req.params.id);
      const deletedOrder: UserReturnType = await user.deleteUser(id);
      return res.json(deletedOrder);
    } catch (err) {
      next(err);
    }
  }
);
