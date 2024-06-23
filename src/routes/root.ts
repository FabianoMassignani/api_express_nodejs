import { Router } from "express";
import UserContainer from "../container/userContainer";
import AuthContainer from "../container/authContainer";

const routes: Router = Router();

const prefix = "/api";

routes.use(`${prefix}/users`, UserContainer.userRouter);
routes.use(`${prefix}/auth`, AuthContainer.authRouter);

export default routes;
