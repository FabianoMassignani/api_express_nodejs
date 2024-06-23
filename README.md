# API RESTful com Express e MongoDB para CRUD de Clientes e Usuários com Autenticação JWT e Testes Unitários

## Como Rodar o Projeto Localmente

1. Instale as dependências:

```
cd crud_clientes_api
npm install
```

2. Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente necessárias:

```
cp .env
```

Adicione as seguintes variáveis de ambiente ao arquivo `.env`:

```
 MONGO_URI=""
 MONGO_URI_TEST=""
 PORT=3001
 JWT_SECRET="mysecretkey"
 JWT_EXPIRATION="1d"
 NODE_ENV="dev"
```

3. Inicie o servidor de desenvolvimento do servidor:

```
npm run dev
```

## Rodar em container Docker

1. Crie a imagem do Docker:

```
docker build -t api .
```

2. Execute o container:

```
docker run -p 3001:3001 -d api
```

## Rotas

### Autenticação

- POST `/api/auth/signIn` - Autentica o usuário e retorna um token JWT

### Usuários

- POST `/api/users` - Cria um novo usuário
- GET `/api/users/getAll` - Retorna todos os usuários com paginação e filtro
- GET `/api/users/:id` - Retorna um usuário específico
- PUT `/api/users` - Atualiza um usuário específico
- DELETE `/api/users/:id` - Deleta um usuário específico

## Testes

1. Troque a variável `NODE_ENV` para `test` no arquivo `.env`:

```bash
NODE_ENV=test
```

2.Para rodar os testes unitários, execute o seguinte comando:

```bash
# testes unitários
# pasta dos testes: tests
$ npm test
```

## Telemetria

- route: rota acessada
- method: método HTTP
- duration: duração da requisição
- status: status da requisição
- error: mensagem de erro
- stack: stack de erro
- createdAt: data de criação do log
