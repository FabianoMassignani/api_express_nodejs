import express, { Express } from "express";
import connectDB from "./config/mongoDB";
import { PORT } from "./config/secrets";
import handleHttpException from "./middlewares/httpException";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import routes from "./routes/root";

const corsOptions = {
  origin: "http://localhost:5173",
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: "Muitas requisições, tente novamente mais tarde",
});

const app: Express = express();

connectDB();

app.use(cors(corsOptions));
app.use(helmet());
app.use(limiter);
app.use(express.json());

app.use(routes);
app.use(handleHttpException);

app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
});
