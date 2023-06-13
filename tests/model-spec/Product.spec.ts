import { Product } from "../../src/api/models/Product";
import {
  ProductType,
  ProductReturnType,
} from "../../src/api/interface/Interfaces";

const product: Product = new Product();

describe("Product Model", () => {
  const productBase: ProductType = {
    name: "iPhone",
    price: "645",
    category: "phone",
  };
  const productBaseEqual: ProductReturnType = {
    id: 2,
    name: "iPhone",
    price: "645",
    category: "phone",
  };

  it("should have a createProduct  method", () => {
    expect(product.createProduct).toBeDefined();
  });

  it("should have a getProductByCat method", () => {
    expect(product.getProductByCat).toBeDefined();
  });

  it("should have a getProductById method", () => {
    expect(product.getProductById).toBeDefined();
  });

  it("should have a getProducts method", () => {
    expect(product.getProducts).toBeDefined();
  });

  it("should have a deleteProduct method", () => {
    expect(product.deleteProduct).toBeDefined();
  });

  it("should create a product using createProduct method", async () => {
    const result: ProductReturnType = await product.createProduct({
      name: "iPhone",
      price: "645",
      category: "phone",
    });
    expect(result).toEqual(productBaseEqual);
  });

  it("should return a list of products using getProducts", async () => {
    const result: ProductReturnType[] = await product.getProducts();
    expect(result).toEqual([productBaseEqual]);
  });

  it("should return the correct product using getProductById", async () => {
    const result: ProductReturnType = await product.getProductById(2);
    expect(result).toEqual(productBaseEqual);
  });

  it("should return the correct product using getProductByCat", async () => {
    const result: ProductReturnType[] = await product.getProductByCat("phone");
    expect(result).toEqual([productBaseEqual]);
  });

  it("should delete the correct product using deleteProduct", async () => {
    const result: ProductReturnType = await product.deleteProduct(2);
    expect(result).toEqual(productBaseEqual);
  });
});
