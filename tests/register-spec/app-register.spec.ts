/* eslint-disable no-undef */
import supertest from "supertest";
import { User } from "../../src/api/models/User";
import server from "../../src/server";
import { UserType } from "../../src/api/interface/Interfaces";

const request = supertest(server);

describe("Test register user ", () => {
  // mock data return
  beforeAll(() => {

    

    spyOn(User.prototype, "createUser").and.returnValue(
      Promise.resolve({
        auth: false,
        name: "",
        token:
          "eyJhbGciOiJIUzI1NiJ9.Mg.s0bq9zBGOBHjWqrcTnVjCxh_2K8q0bJI9jrQDa-Itks",
      })
    );
  });

  it("register user", async (done) => {

    const userBase: UserType = {
      firstname: "luannt19",
      lastname: "udacity",
      password: "thispassword",
    };

    const res = await request
      .post("/register").send(userBase);

    expect(res.status).toBe(200);
    expect(res.body.auth).toBeFalse();
    expect(res.body.token).toBeDefined();
    done();
  });
});
