import { Router } from "express";
import productRouter from "./product";
import userRouter from "./user";

const routes: Router = Router();
const prefix = "/api";

routes.use(`${prefix}/products`, productRouter);
routes.use(`${prefix}/users`, userRouter);

export default routes;
