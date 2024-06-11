import request from "supertest";
import app from "../server";

describe("UserController", () => {
  const userData = {
    email: "test@example.com",
    password: "password123",
    name: "Test User",
    active: true,
    role: "client",
  };

  it("should sign up a new user", async () => {
    const response = await request(app).post("/api/users/signUp").send(userData);

    console.log(response.body);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("email", userData.email);
    expect(response.body.data).toHaveProperty("name", userData.name);
    expect(response.body.message).toBe("Criado com sucesso");
  });

  // it("should sign in an existing user", async () => {
  //   const response = await request(app).post("/signin").send({
  //     email: userData.email,
  //     password: userData.password,
  //   });

  //   expect(response.status).toBe(200);
  //   expect(response.body).toHaveProperty("email", userData.email);
  //   expect(response.body).toHaveProperty("name", userData.name);
  //   expect(response.body).toHaveProperty("accessToken");
  // });
});
