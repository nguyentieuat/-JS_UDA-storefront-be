import { Request, Response } from "express";
import { ErrorExceptionCustom } from "./ErrorExceptionCustom";

export const errorHandler = (err: Error, req: Request, res: Response) => {
  console.log("Error handling middleware called.");
  console.log("Path:", req.path);
  console.error("Error occured:", err);
  if (err instanceof ErrorExceptionCustom) {
    res.status(err.code).send(err);
  } else {
    // For unhandled errors.
    res
      .status(500)
      .send({ code: "UnknownError", status: 500, message: err.message });
  }
};
