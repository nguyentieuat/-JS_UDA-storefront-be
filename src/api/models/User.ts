import { PoolClient, QueryResult } from "pg";
import { pool } from "../db";
import { Utils } from "../utils/Utils";
import {
  UserReturnType,
  UserType,
  UserCreatedReturnType,
} from "../interface/Interfaces";

export class User {
  // define table
  table = "users";
  // create a user
  async createUser(
    user: UserType,
    isAuth: boolean
  ): Promise<UserCreatedReturnType> {
    try {
      const { firstname, lastname, password } = user;

      const hashPassword = await Utils.generatePassword(password);

      const conn: PoolClient = await pool.connect();
      const sql = `INSERT INTO ${this.table} (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *`;
      const result: QueryResult = await conn.query(sql, [
        firstname,
        lastname,
        hashPassword,
      ]);
      conn.release();

      const id: number = result.rows[0].id;
      const token: string = (await Utils.generateToken(id)) as string;
      return {
        auth: isAuth,
        name: firstname + " " + lastname,
        token,
      };
    } catch (err) {
      throw new Error(`Could not create user. Error: ${err}`);
    }
  }

  // select all users
  async getUsers(): Promise<UserReturnType[]> {
    try {
      const conn: PoolClient = await pool.connect();
      const sql = `SELECT * FROM ${this.table}`;
      const result: QueryResult = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get all users. Error: ${err}`);
    }
  }

  // select user by id
  async getUserById(userId: number): Promise<UserReturnType> {
    try {
      const conn: PoolClient = await pool.connect();
      const sql = `SELECT * FROM ${this.table} WHERE id = $1`;
      const result: QueryResult = await conn.query(sql, [userId]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get user by id. Error: ${err}`);
    }
  }

  // update user
  async updateUser(id: number, userData: UserType): Promise<UserReturnType> {
    try {
      const passwordNew: string = userData.password
        ? (await Utils.generatePassword(userData.password)) as string
        : "";

      const sql = passwordNew
        ? "UPDATE users SET firstname = $1, lastname = $2, password = $3 WHERE id = $4 RETURNING *"
        : "UPDATE users SET firstname = $1, lastname = $2 WHERE id = $3 RETURNING *";
      const conn: PoolClient = await pool.connect();
      const { rows } = await conn.query(
        sql,
        passwordNew
          ? [userData.firstname, userData.lastname, passwordNew, id]
          : [userData.firstname, userData.lastname, id]
      );
      conn.release();
      return rows[0];
    } catch (err) {
      throw new Error(`Could not update user ${id}. Error: ${err}`);
    }
  }

  // delete user
  async deleteUser(id: number): Promise<UserReturnType> {
    try {
      const sql = `DELETE FROM ${this.table} WHERE id=$1 RETURNING *`;
      const conn: PoolClient = await pool.connect();
      const result: QueryResult = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}
