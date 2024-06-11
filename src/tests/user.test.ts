import request from "supertest";
import app from "../server";
import mongoose from "mongoose";
import { UserModel } from "../models/user";

describe("UserController", () => {
  const userData = {
    email: "test@example.com",
    password: "password123",
    name: "Test User",
    active: true,
    role: "client",
  };

  beforeAll(async () => {
    await UserModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("Registrar novo usuário sem e-mail", async () => {
    const response = await request(app)
      .post("/api/users/signUp")
      .send({ ...userData, email: "" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email não informado");
  });

  it("Registrar novo usuário sem senha", async () => {
    const response = await request(app)
      .post("/api/users/signUp")
      .send({ ...userData, password: "" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Senha não informada");
  });

  it("Registrar novo usuário sem nome", async () => {
    const response = await request(app)
      .post("/api/users/signUp")
      .send({ ...userData, name: "" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Nome não informado");
  });

  it("Registrar novo usuário", async () => {
    const response = await request(app)
      .post("/api/users/signUp")
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("email", userData.email);
    expect(response.body.data).toHaveProperty("name", userData.name);
    expect(response.body.message).toBe("Criado com sucesso");
  });

  it("Não deve permitir o registro de um usuário com e-mail duplicado", async () => {
    await request(app).post("/api/users/signUp").send(userData);

    const response = await request(app)
      .post("/api/users/signUp")
      .send(userData);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email já cadastrado");
  });

  it("Fazer login do usuário sem e-mail", async () => {
    const response = await request(app).post("/api/users/signIn").send({
      email: "",
      password: userData.password,
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email não informado");
  });

  it("Fazer login do usuário sem senha", async () => {
    const response = await request(app).post("/api/users/signIn").send({
      email: userData.email,
      password: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Senha não informada");
  });

  it("Fazer login do usuário com usuário não encontrado", async () => {
    const response = await request(app).post("/api/users/signIn").send({
      email: "teste@hotmail.com",
      password: userData.password,
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Usuário não encontrado");
  });

  it("Fazer login do usuário com senha inválida", async () => {
    const response = await request(app).post("/api/users/signIn").send({
      email: userData.email,
      password: "senha123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Senha inválida");
  });

  it("Fazer login do usuário", async () => {
    const response = await request(app).post("/api/users/signIn").send({
      email: userData.email,
      password: userData.password,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("email", userData.email);
    expect(response.body).toHaveProperty("name", userData.name);
    expect(response.body).toHaveProperty("accessToken");
  });
});
