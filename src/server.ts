import express, { Express } from "express";
import handleHttpException from "./middlewares/httpException";
import cors from "cors";
import helmet from "helmet";
import corsOptions from "./config/cors";
import connectDB from "./config/mongoDB";
import { getMetrics } from "./config/prometheus";
import limiter from "./config/rateLimiter";
import routes from "./routes/root";

const app: Express = express();

connectDB();
app.use(cors(corsOptions));
app.use(helmet());
app.use(limiter);
app.use(express.json());
//app.get("/metrics", getMetrics);
app.use(routes);
app.use(handleHttpException);

export default app;
