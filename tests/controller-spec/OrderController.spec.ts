/* eslint-disable no-undef */
import supertest from "supertest";
import { Order } from "../../src/api/models/Order";
import server from "../../src/server";
import { OrderReturnType } from "../../src/api/interface/Interfaces";

const request = supertest(server);
const token: string =
  "eyJhbGciOiJIUzI1NiJ9.Mg.s0bq9zBGOBHjWqrcTnVjCxh_2K8q0bJI9jrQDa-Itks";

describe("Test OrderController ", () => {
  const orderBaseActive: OrderReturnType = {
    id: 2,
    product_id: 10,
    quantity: 4,
    user_id: 2,
    status: "active",
  };

  const orderBaseComplete: OrderReturnType = {
    id: 2,
    product_id: 10,
    quantity: 4,
    user_id: 2,
    status: "complete",
  };

  const orderBaseActiveEqual: OrderReturnType = {
    id: 2,
    product_id: 10,
    quantity: 4,
    user_id: 2,
    status: "active",
  };

  const orderBaseCompleteEqual: OrderReturnType = {
    id: 2,
    product_id: 10,
    quantity: 4,
    user_id: 2,
    status: "complete",
  };
  beforeAll(() => {
    spyOn(Order.prototype, "createOrder").and.returnValue(
      Promise.resolve(orderBaseActive)
    );
    spyOn(Order.prototype, "getOrders").and.returnValue(
      Promise.resolve([
        orderBaseActive,
        orderBaseComplete,
      ])
    );
    spyOn(Order.prototype, "getCurrentOrderByUserId").and.returnValue(
      Promise.resolve(orderBaseActive)
    );
    spyOn(Order.prototype, "getActiveOrdersByUserId").and.returnValue(
      Promise.resolve([
        orderBaseActive,
      ])
    );
    spyOn(Order.prototype, "getCompletedOrdersByUserId").and.returnValue(
      Promise.resolve([
        orderBaseComplete,
      ])
    );
    spyOn(Order.prototype, "updateOrderStatus").and.returnValue(
      Promise.resolve(orderBaseComplete)
    );
    spyOn(Order.prototype, "deleteOrder").and.returnValue(
      Promise.resolve(orderBaseActive)
    );
  });

  it("create order api endpoint", async (done) => {
    const res = await request
      .post("/orders")
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(orderBaseActive);
    done();
  });

  it("gets all orders api endpoint", async (done) => {
    const res = await request
      .get("/orders/2")
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
        orderBaseActive,
        orderBaseComplete,
    ]);
    done();
  });

  it("gets current user order by id api endpoint", async (done) => {
    const res = await request
      .get("/orders/current/2")
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(orderBaseActive);
    done();
  });

  it("gets active user order api endpoint", async (done) => {
    const res = await request
      .get("/orders/active/2")
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
        orderBaseActive,
    ]);
    done();
  });

  it("gets completed user order api endpoint", async (done) => {
    const res = await request
      .get("/orders/completed/2")
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
        orderBaseComplete,
    ]);
    done();
  });
  
  it("updates user order api endpoint", async (done) => {
    const res = await request
      .put("/orders?status=active&orderId=1")
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(orderBaseComplete);
    done();
  });

  it("updates user order with wrong parameters api endpoint", async (done) => {
    const res = await request
      .put("/orders?status=acti&orderId=1")
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(400);
    expect(res.body.Error).toEqual("Bad parameters");
    done();
  });

  it("delets a user order api endpoint", async (done) => {
    const res = await request
      .delete("/orders/1")
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(orderBaseActive);
    done();
  });
});
