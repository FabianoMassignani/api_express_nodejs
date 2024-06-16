import express, { Express } from "express";
import connectDB from "./config/mongoDB";
import handleHttpException from "./middlewares/httpException";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import Prometheus from "prom-client";
import routes from "./routes/root";

const register = new Prometheus.Registry();
register.setDefaultLabels({
  app: "your-app-name",
});
Prometheus.collectDefaultMetrics({ register });

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

app.get("/metrics", function (req, res) {
  res.setHeader("Content-Type", register.contentType);

  register.metrics().then((data: any) => res.status(200).send(data));
});

app.use(routes);
app.use(handleHttpException);

export default app;
