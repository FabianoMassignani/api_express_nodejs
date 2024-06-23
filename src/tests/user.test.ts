import request from "supertest";
import app from "../server";

describe("UserController", () => {
  let userAdmin = {
    username: "Test User",
    email: "test@example.com",
    password: "password123",
    active: true,
    role: ["ADMIN"],
  };

  const user = {
    username: "Test User 2",
    email: "test2@hotmail.com",
    password: "password123",
    active: true,
    role: ["USER"],
  };

  let idUserCriado = "";
  let idUserCriado2 = "";
  let tokenAdmin = "";
  let tokenUser = "";

  it("Registrar novo usuário sem e-mail", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({ ...userAdmin, email: "" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email não informado");
  });

  it("Registrar novo usuário sem senha", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({ ...userAdmin, password: "" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Senha não informada");
  });

  it("Registrar novo usuário sem nome", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({ ...userAdmin, username: "" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Nome não informado");
  });

  it("Registrar novo usuário", async () => {
    const response = await request(app).post("/api/users").send(userAdmin);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("email", userAdmin.email);
    expect(response.body.user).toHaveProperty("username", userAdmin.username);
    expect(response.body.message).toBe("Criado com sucesso");

    idUserCriado = response.body.user._id;
  });

  it("Não deve permitir o registro de um usuário com e-mail duplicado", async () => {
    await request(app).post("/api/users").send(userAdmin);

    const response = await request(app).post("/api/users").send(userAdmin);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email já cadastrado");
  });

  it("Fazer login do usuário sem e-mail", async () => {
    const response = await request(app).post("/api/auth/signIn").send({
      email: "",
      password: userAdmin.password,
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email não informado");
  });

  it("Fazer login do usuário sem senha", async () => {
    const response = await request(app).post("/api/auth/signIn").send({
      email: userAdmin.email,
      password: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Senha não informada");
  });

  it("Fazer login do usuário com usuário não encontrado", async () => {
    const response = await request(app).post("/api/auth/signIn").send({
      email: "teste@hotmail.com",
      password: userAdmin.password,
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Usuário não encontrado!");
  });

  it("Fazer login do usuário com senha inválida", async () => {
    const response = await request(app).post("/api/auth/signIn").send({
      email: userAdmin.email,
      password: "senha123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Senha inválida");
  });

  it("Fazer login do usuário", async () => {
    const response = await request(app).post("/api/auth/signIn").send({
      email: userAdmin.email,
      password: userAdmin.password,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("email", userAdmin.email);
    expect(response.body).toHaveProperty("username", userAdmin.username);
    expect(response.body).toHaveProperty("accessToken");

    tokenAdmin = response.body.accessToken;
  });

  it("Buscar usuário por ID sem token", async () => {
    const response = await request(app).get(
      `/api/users/getById/${idUserCriado}`
    );

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Token não encontrado!");
  });

  it("Buscar usuário por ID", async () => {
    const response = await request(app)
      .get(`/api/users/getById/${idUserCriado}`)
      .set("Authorization", `Bearer ${tokenAdmin}`);

    expect(response.status).toBe(200);
    expect(response.body.user).toHaveProperty("email", userAdmin.email);
    expect(response.body.user).toHaveProperty("username", userAdmin.username);
  });

  it("Buscar todos os usuários sem token", async () => {
    const response = await request(app).get("/api/users/getAll");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Token não encontrado!");
  });

  it("Buscar todos os usuários sem limit", async () => {
    const response = await request(app)
      .get("/api/users/getAll")
      .query({ page: 1, search: "" })
      .set("Authorization", `Bearer ${tokenAdmin}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Limit não informado");
  });

  it("Buscar todos os usuários sem page", async () => {
    const response = await request(app)
      .get("/api/users/getAll")
      .query({ limit: 10, search: "" })
      .set("Authorization", `Bearer ${tokenAdmin}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Page não informado");
  });

  it("Buscar todos os usuários", async () => {
    const response = await request(app)
      .get("/api/users/getAll")
      .query({ limit: 10, page: 1, search: "" })
      .set("Authorization", `Bearer ${tokenAdmin}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("users");
  });

  it("Atualizar usuário sem informar o ID", async () => {
    let data = { ...userAdmin, username: "Test User Updated" };

    const response = await request(app)
      .put("/api/users")
      .send(data)
      .set("Authorization", `Bearer ${tokenAdmin}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Id não informado");
  });

  it("Atualizar usuário sem informar o token", async () => {
    let data = {
      ...userAdmin,
      _id: idUserCriado,
      username: "Test User Updated",
    };

    const response = await request(app).put("/api/users").send(data);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Token não encontrado!");
  });

  it("Atualizar usuário sem informar o nome", async () => {
    let data = { ...userAdmin, _id: idUserCriado, username: "" };

    const response = await request(app)
      .put("/api/users")
      .send(data)
      .set("Authorization", `Bearer ${tokenAdmin}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Nome não informado");
  });

  it("Atualizar usuário sem informar o e-mail", async () => {
    let data = { ...userAdmin, _id: idUserCriado, email: "" };

    const response = await request(app)
      .put("/api/users")
      .send(data)
      .set("Authorization", `Bearer ${tokenAdmin}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email não informado");
  });

  it("Atualizar usuário", async () => {
    let data = {
      ...userAdmin,
      _id: idUserCriado,
      username: "Test User Updated",
    };

    const response = await request(app)
      .put("/api/users")
      .send(data)
      .set("Authorization", `Bearer ${tokenAdmin}`);

    expect(response.status).toBe(201);
    expect(response.body.user).toHaveProperty("email", userAdmin.email);
    expect(response.body.user).toHaveProperty("username", "Test User Updated");
    expect(response.body.message).toBe("Editado com sucesso");
  });

  it("Registrar novo usuário com role USER", async () => {
    const responseuser = await request(app).post("/api/users").send(user);

    expect(responseuser.status).toBe(201);
    expect(responseuser.body).toHaveProperty("user");
    expect(responseuser.body.user).toHaveProperty("email", user.email);
    expect(responseuser.body.user).toHaveProperty("username", user.username);
    expect(responseuser.body.message).toBe("Criado com sucesso");

    idUserCriado2 = responseuser.body.user._id;
  });

  it("Fazer login do usuário com role USER", async () => {
    const responseuser = await request(app).post("/api/auth/signIn").send({
      email: user.email,
      password: user.password,
    });

    expect(responseuser.status).toBe(201);
    expect(responseuser.body).toHaveProperty("email", user.email);
    expect(responseuser.body).toHaveProperty("username", user.username);
    expect(responseuser.body).toHaveProperty("accessToken");

    tokenUser = responseuser.body.accessToken;
  });

  it("Atualizar usuário sem role necessária", async () => {
    let data = {
      ...user,
      _id: idUserCriado2,
    };

    const response = await request(app)
      .put("/api/users")
      .send(data)
      .set("Authorization", `Bearer ${tokenUser}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Usuário não autorizado");
  });

  it("Deletar usuário sem informar o token", async () => {
    const response = await request(app).delete(`/api/users/${idUserCriado}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Token não encontrado!");
  });

  it("Deletar usuário sem role necessária", async () => {
    const response = await request(app)
      .delete(`/api/users/${idUserCriado2}`)
      .set("Authorization", `Bearer ${tokenUser}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Usuário não autorizado");
  });

  it("Deletar usuário user", async () => {
    const response = await request(app)
      .delete(`/api/users/${idUserCriado2}`)
      .set("Authorization", `Bearer ${tokenAdmin}`);

    expect(response.status).toBe(201);
  });

  it("Deletar usuário Admin", async () => {
    const response = await request(app)
      .delete(`/api/users/${idUserCriado}`)
      .set("Authorization", `Bearer ${tokenAdmin}`);

    expect(response.status).toBe(201);
  });
});
