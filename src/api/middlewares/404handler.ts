import { NextFunction, Request, Response } from "express";
import { ErrorExceptionCustom } from "./error-handler/ErrorExceptionCustom";

export const requestNotFound404 = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // eslint-disable-next-line no-undef
  const error = new ErrorExceptionCustom("Not Found");
  error.code = 404;
  next(error);
};
