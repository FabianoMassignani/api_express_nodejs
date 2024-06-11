import express, { Express } from "express";
import connectDB from "./config/mongoDB";
import handleHttpException from "./middlewares/httpException";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import routes from "./routes/root";

const app: Express = express();

const corsOptions = {
  origin: "http://localhost:5173",
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: "Muitas requisições, tente novamente mais tarde",
});

connectDB();
app.use(cors(corsOptions));
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(routes);
app.use(handleHttpException);

export default app;
