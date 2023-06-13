/* eslint-disable no-undef */
import supertest from "supertest";
import { Product } from "../../src/api/models/Product";
import server from "../../src/server";
import { ProductReturnType } from "../../src/api/interface/Interfaces";

const request = supertest(server);
const token: string =
  "eyJhbGciOiJIUzI1NiJ9.Mg.s0bq9zBGOBHjWqrcTnVjCxh_2K8q0bJI9jrQDa-Itks";

describe("Test ProductController ", () => {
  const productBase: ProductReturnType = {
    id: 1,
    name: "iphone",
    price: "3000",
    category: "phone",
  };

  const productBaseEqual: ProductReturnType = {
    id: 1,
    name: "iphone",
    price: "3000",
    category: "phone",
  };

  beforeAll(() => {
    spyOn(Product.prototype, "getProducts").and.returnValue(
      Promise.resolve([
        productBase,
      ])
    );

    spyOn(Product.prototype, "getProductById").and.returnValue(
      Promise.resolve(productBase)
    );

    spyOn(Product.prototype, "getProductByCat").and.returnValue(
      Promise.resolve([
        productBase,
      ])
    );

    spyOn(Product.prototype, "createProduct").and.returnValue(
      Promise.resolve(productBase)
    );

    spyOn(Product.prototype, "deleteProduct").and.returnValue(
      Promise.resolve(productBase)
    );
  });

  it("gets all products api endpoint", async (done) => {
    const res = await request
      .get("/products")
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      productBaseEqual,
    ]);
    done();
  });
  it("gets product by id api endpoint", async (done) => {
    const res = await request
      .get("/products/1")
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(productBaseEqual);
    done();
  });
  it("gets product by category api endpoint", async (done) => {
    const res = await request
      .get("/products/cat/phone")
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
        productBaseEqual,
    ]);
    done();
  });
  it("create product api endpoint", async (done) => {
    const res = await request
      .post("/products")
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(productBaseEqual);
    done();
  });
  it("delets a product api endpoint", async (done) => {
    const res = await request
      .delete("/products/1")
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(productBaseEqual);
    done();
  });
});
