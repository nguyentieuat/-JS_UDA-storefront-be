import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const port = 8080;

const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default server;
