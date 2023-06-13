/* eslint-disable no-undef */
import supertest from "supertest";
import { User } from "../../src/api/models/User";
import server from "../../src/server";
import { UserReturnType } from "../../src/api/interface/Interfaces";

const request = supertest(server);
const token: string =
  "eyJhbGciOiJIUzI1NiJ9.Mg.s0bq9zBGOBHjWqrcTnVjCxh_2K8q0bJI9jrQDa-Itks";

describe("Test UserController ", () => {
  const userBase: UserReturnType = {
    id: 1,
    firstname: "luannt19",
    lastname: "udacity",
    password: "thispassword",
  };

  const userBaseEqual: UserReturnType = {
    id: 1,
    firstname: "luannt19",
    lastname: "udacity",
    password: "thispassword",
  };
  // mock data return
  beforeAll(() => {
    spyOn(User.prototype, "getUsers").and.returnValue(
      Promise.resolve([userBase])
    );

    spyOn(User.prototype, "getUserById").and.returnValue(
      Promise.resolve(userBase)
    );

    spyOn(User.prototype, "createUser").and.returnValue(
      Promise.resolve({
        auth: true,
        name: "",
        token:
          "eyJhbGciOiJIUzI1NiJ9.Mg.s0bq9zBGOBHjWqrcTnVjCxh_2K8q0bJI9jrQDa-Itks",
      })
    );

    spyOn(User.prototype, "deleteUser").and.returnValue(
      Promise.resolve(userBase)
    );
  });

  it("gets all users api endpoint", async (done) => {
    const res = await request
      .get("/users")
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual([userBaseEqual]);
    done();
  });

  it("gets user by id api endpoint", async (done) => {
    const res = await request
      .get("/users/1")
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(userBaseEqual);
    done();
  });

  it("create user api endpoint", async (done) => {
    const res = await request
      .post("/users")
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(200);
    expect(res.body.auth).toEqual(true);
    expect(res.body.token).toBeDefined();
    done();
  });

  it("delets a user api endpoint", async (done) => {
    const res = await request
      .delete("/users/1")
      .set("Authorization", "Bearer " + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(userBaseEqual);
    done();
  });
});
