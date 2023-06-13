import { Order } from "../../src/api/models/Order";
import { User } from "../../src/api/models/User";
import { Product } from "../../src/api/models/Product";
import {
  UserType,
  ProductType,
  OrderType,
  OrderReturnType,
} from "../../src/api/interface/Interfaces";

const order: Order = new Order();

describe("Order Model", () => {
  it("should have an getCurrentOrderByUserId  method", () => {
    expect(order.getCurrentOrderByUserId).toBeDefined();
  });

  it("should have a getCompletedOrdersByUserId method", () => {
    expect(order.getCompletedOrdersByUserId).toBeDefined();
  });

  it("should have an getActiveOrdersByUserId  method", () => {
    expect(order.getActiveOrdersByUserId).toBeDefined();
  });

  it("should have a getOrders method", () => {
    expect(order.getOrders).toBeDefined();
  });

  it("should have an updateOrderStatus  method", () => {
    expect(order.updateOrderStatus).toBeDefined();
  });

  it("should have a deleteOrder method", () => {
    expect(order.deleteOrder).toBeDefined();
  });

  it("should have a createOrder method", () => {
    expect(order.createOrder).toBeDefined();
  });

  describe("Manipulate Order methods", () => {
    const user = new User();
    const product = new Product();
    const userBase: UserType = {
      firstname: "luannt19",
      lastname: "udacity",
      password: "thispassword",
    };

    const productBase: ProductType = {
      name: "iPhone",
      price: "645",
      category: "phone",
    };

    const orderBase: OrderType = {
      product_id: 1,
      quantity: 10,
      user_id: 1,
      status: "active",
    };

    const orderBaseActive: OrderReturnType = {
      id: 1,
      product_id: 1,
      quantity: 10,
      user_id: 1,
      status: "active",
    };

    const orderBaseComplete: OrderReturnType = {
      id: 1,
      product_id: 1,
      quantity: 10,
      user_id: 1,
      status: "complete",
    };

    const orderBaseActiveEqual: OrderReturnType = {
      id: 1,
      product_id: 1,
      quantity: 10,
      user_id: 1,
      status: "active",
    };

    const orderBaseCompleteEqual: OrderReturnType = {
      id: 1,
      product_id: 1,
      quantity: 10,
      user_id: 1,
      status: "complete",
    };

    beforeAll(async () => {
      await user.createUser(userBase, true);
      await product.createProduct(productBase);
    });
    afterAll(async () => {
      await user.deleteUser(1);
      await product.deleteProduct(1);
    });

    it("should create order using createOrder method", async () => {
      const result: OrderReturnType = await order.createOrder(orderBase);
      expect(result).toEqual(orderBaseActive);
    });
    it("should return all orders of user using getOrders method", async () => {
      const result: OrderReturnType[] = await order.getOrders(1);
      expect(result).toEqual([orderBaseActiveEqual]);
    });
    it("should return current order of user using getCurrentOrderByUserId method", async () => {
      const result: OrderReturnType = await order.getCurrentOrderByUserId(1);
      expect(result).toEqual(orderBaseActiveEqual);
    });
    it("should return active orders of user using getActiveOrdersByUserId method", async () => {
      const result: OrderReturnType[] = await order.getActiveOrdersByUserId(1);
      expect(result).toEqual([orderBaseActiveEqual]);
    });
    it("should return completed orders of user using getCompletedOrdersByUserId method", async () => {
      const result: OrderReturnType[] = await order.getCompletedOrdersByUserId(1);
      expect(result).toEqual([]);
    });
    it("should update order status using updateOrderStatus method", async () => {
      const result: OrderReturnType = await order.updateOrderStatus(
        "complete",
        1
      );
      expect(result).toEqual(orderBaseCompleteEqual);
    });
    it("should delete the correct order", async () => {
      const result: OrderReturnType = await order.deleteOrder(1);
      expect(result).toEqual(orderBaseComplete);
    });
  });
});
