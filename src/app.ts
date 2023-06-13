import express, { Application, Request, Response } from "express";
import path from "path";
import { routes } from "./api/routes";
import { requestNotFound404 } from "./api/middlewares/404handler";
import { errorHandler } from "./api/middlewares/error-handler/errorHandler";
import { User } from "./api/models/User";
import { UserType, UserCreatedReturnType } from "./api/interface/Interfaces";

const app: Application = express();

// add json parser
app.use(express.json());

// set routes
routes(app);

app.get("/", async (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "./views/index.html"));
});

app.post("/register", async (req: Request, res: Response) => {
  const userModel: User = new User();
  const user: UserType = req.body;
  const { firstname, lastname, password } = user;

  // Validate user input
  if (!(firstname && lastname && password)) {
    res.status(400).send("All input is required");
  }

  if (!firstname || !lastname || !password) {
    res.status(400).send("Some required parameters are missing");
  }

  const newUser: UserCreatedReturnType = await userModel.createUser(req.body, false);

  return res.json(newUser);
});

// handle unknown requests
app.use(requestNotFound404);

// handle errors
app.use(errorHandler);

export default app;
