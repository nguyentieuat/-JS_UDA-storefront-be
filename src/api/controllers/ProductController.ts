import { Router, Response, Request, NextFunction } from "express";
import { authToken } from "../middlewares/auth";
import { Product } from "../models/Product";
import { ProductType } from "../interface/Interfaces";

export const ProductController: Router = Router();
const product: Product = new Product();

// Get all products
ProductController.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allProducts: ProductType[] = await product.getProducts();
      return res.json(allProducts);
    } catch (err) {
      next(err);
    }
  }
);

// Get product by id
ProductController.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId: number = parseInt(req.params.id);
      const productById: ProductType = await product.getProductById(productId);
      return res.json(productById);
    } catch (err) {
      next(err);
    }
  }
);

// Get products by category
ProductController.get(
  "/cat/:category",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = String(req.params.category);
      const productByCat: ProductType[] = await product.getProductByCat(
        category
      );
      return res.json(productByCat);
    } catch (err) {
      next(err);
    }
  }
);

// Create product
ProductController.post(
  "/",
  authToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createdProduct: ProductType = await product.createProduct(req.body);
      return res.json(createdProduct);
    } catch (err) {
      next(err);
    }
  }
);

// Delete product by id
ProductController.delete(
  "/:id",
  authToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: number = parseInt(req.params.id);
      const deletedOrder = await product.deleteProduct(id);
      return res.json(deletedOrder);
    } catch (err) {
      next(err);
    }
  }
);
