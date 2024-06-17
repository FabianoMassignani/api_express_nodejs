import express, { Express } from "express";
import handleHttpException from "./middlewares/httpException";
import cors from "cors";
import helmet from "helmet";
import corsOptions from "./config/cors";
import connectDB from "./config/mongoDB";
import limiter from "./config/rateLimiter";
import routes from "./routes/root";
import telemetry from "./middlewares/telemetry";

const app: Express = express();

connectDB();
app.use(cors(corsOptions));
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(telemetry);
app.use(routes);
app.use(handleHttpException);

export default app;
