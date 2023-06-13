import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  ENVI,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env;

export const pool: Pool = new Pool({
  host: POSTGRES_HOST,
  database: ENVI === "test" ? POSTGRES_DB_TEST : POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});
