import { Request, Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken";
import { ErrorExceptionCustom } from "./error-handler/ErrorExceptionCustom";

export const authToken = (req: Request, res: Response, next: NextFunction) => {
  const authHead =
    req.headers.authorization ||
    req.body.token ||
    req.query.token ||
    req.params.token ||
    req.headers["x-access-token"];

  const token: string = authHead ? authHead.split(" ")[1] : "";

  if (!token) {
    throw new ErrorExceptionCustom(ErrorExceptionCustom.Unauthenticated, {
      message: "A token is required for authentication",
    });
  }
  try {
    const decoded = jsonwebtoken.verify(token, process.env.TOKEN_KEY as string);
    res.locals.userData = decoded;
  } catch (err) {
    // return res.status(401).send("Invalid Token");
    next(err);
  }
  return next();
};
