import express, { Express } from "express";
import cors from "cors";
import connectDB from "./config/mongoDB";
import { PORT } from "./secrets";
import routes from "./routes";
import { handleHttpException } from "./middlewares/handleHttpException";

const app: Express = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(handleHttpException);

app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
});
