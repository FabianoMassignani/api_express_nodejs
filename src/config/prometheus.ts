import Prometheus from "prom-client";
import { Request, Response } from "express";

const register = new Prometheus.Registry();

register.setDefaultLabels({
  app: "api-node-class",
});

const http_request_counter = new Prometheus.Counter({
  name: "http_request_count",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "statusCode"],
});

register.registerMetric(http_request_counter);

Prometheus.collectDefaultMetrics({ register });

const getMetrics = async (_req: Request, res: Response) => {
  res.setHeader("Content-Type", register.contentType);
  const metrics = await register.metrics();

  res.status(200).send(metrics);
};

export { register, getMetrics };
