import request from "supertest";
import app from "../server";

describe("UserController", () => {
  let userData = {
    email: "test@example.com",
    password: "password123",
    username: "Test User",
    active: true,
    role: "client",
  };

  let idUserCriado = "";

  it("Registrar novo usuário sem e-mail", async () => {
    const response = await request(app)
      .post("/api/users/register")
      .send({ ...userData, email: "" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email não informado");
  });

  it("Registrar novo usuário sem senha", async () => {
    const response = await request(app)
      .post("/api/users/register")
      .send({ ...userData, password: "" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Senha não informada");
  });

  it("Registrar novo usuário sem nome", async () => {
    const response = await request(app)
      .post("/api/users/register")
      .send({ ...userData, username: "" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Nome não informado");
  });

  it("Registrar novo usuário", async () => {
    const response = await request(app)
      .post("/api/users/register")
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("email", userData.email);
    expect(response.body.data).toHaveProperty("username", userData.username);
    expect(response.body.message).toBe("Criado com sucesso");

    idUserCriado = response.body.data._id;
  });

  it("Não deve permitir o registro de um usuário com e-mail duplicado", async () => {
    await request(app).post("/api/users/register").send(userData);

    const response = await request(app)
      .post("/api/users/register")
      .send(userData);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email já cadastrado");
  });

  it("Fazer login do usuário sem e-mail", async () => {
    const response = await request(app).post("/api/auth/signIn").send({
      email: "",
      password: userData.password,
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email não informado");
  });

  it("Fazer login do usuário sem senha", async () => {
    const response = await request(app).post("/api/auth/signIn").send({
      email: userData.email,
      password: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Senha não informada");
  });

  it("Fazer login do usuário com usuário não encontrado", async () => {
    const response = await request(app).post("/api/auth/signIn").send({
      email: "teste@hotmail.com",
      password: userData.password,
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Usuário não encontrado!");
  });

  it("Fazer login do usuário com senha inválida", async () => {
    const response = await request(app).post("/api/auth/signIn").send({
      email: userData.email,
      password: "senha123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Senha inválida");
  });

  it("Fazer login do usuário", async () => {
    const response = await request(app).post("/api/auth/signIn").send({
      email: userData.email,
      password: userData.password,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("email", userData.email);
    expect(response.body).toHaveProperty("username", userData.username);
    expect(response.body).toHaveProperty("accessToken");
  });

  it("Deletar usuário", async () => {
    const response = await request(app).delete(`/api/users/${idUserCriado}`);

    expect(response.status).toBe(201);
  });
});
