import { Router, Response, Request, NextFunction } from "express";
import { authToken } from "../middlewares/auth";
import { Order } from "../models/Order";
import { OrderType, OrderReturnType } from "../interface/Interfaces";

export const OrderController: Router = Router();
const order: Order = new Order();

// Get all orders by user id
OrderController.get(
  "/:user_id",
  authToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: number = parseInt(req.params.user_id);
      const currentOrder: OrderReturnType[] = await order.getOrders(userId);
      return res.json(currentOrder);
    } catch (err) {
      next(err);
    }
  }
);

// Get current order by user id
OrderController.get(
  "/current/:user_id",
  authToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: number = parseInt(req.params.user_id);
      const currentOrder: OrderReturnType = await order.getCurrentOrderByUserId(
        userId
      );
      return res.json(currentOrder);
    } catch (err) {
      next(err);
    }
  }
);

// Get active order by user id
OrderController.get(
  "/active/:user_id",
  authToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: number = parseInt(req.params.user_id);
      const activeOrder: OrderReturnType[] =
        await order.getActiveOrdersByUserId(userId);
      return res.json(activeOrder);
    } catch (err) {
      next(err);
    }
  }
);

// Get all completed orders by user id
OrderController.get(
  "/completed/:user_id",
  authToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: number = parseInt(req.params.user_id);
      const currentOrder: OrderReturnType[] =
        await order.getCompletedOrdersByUserId(userId);
      return res.json(currentOrder);
    } catch (err) {
      next(err);
    }
  }
);

// Update order's status.
OrderController.put(
  "/",
  authToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const status = req.query.status as string;
      const orderId = parseInt(req.query.orderId as string);

      if (orderId && ["active", "complete"].includes(status)) {
        const updatedOrder: OrderReturnType = await order.updateOrderStatus(
          status,
          orderId
        );
        return res.json(updatedOrder);
      } else {
        return res.status(400).json({ Error: "Bad parameters" });
      }
    } catch (err) {
      next(err);
    }
  }
);

// delete order by order id
OrderController.delete(
  "/:id",
  authToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: number = parseInt(req.params.id);
      const deletedOrder: OrderReturnType = await order.deleteOrder(id);
      return res.json(deletedOrder);
    } catch (err) {
      next(err);
    }
  }
);
// create order
OrderController.post(
  "/",
  authToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newOrder: OrderType = await order.createOrder(req.body);
      return res.json(newOrder);
    } catch (err) {
      next(err);
    }
  }
);
