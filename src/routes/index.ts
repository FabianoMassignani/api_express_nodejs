import { Router } from "express";
import productRouter from "./product";

const routes: Router = Router();
const prefix = "/api";

routes.use(`${prefix}/products`, productRouter);

export default routes;
