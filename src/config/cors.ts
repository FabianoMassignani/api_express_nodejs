import { CorsOptions } from "cors";

const CORS: CorsOptions = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true,
};

export default CORS;
