import { Request, Response, NextFunction } from "express";
import TelemetryService from "../services/TelemetryService";
import TelemetryRepository from "../repositorys/telemetryRepository";

const TelemetryContainer = new TelemetryService(new TelemetryRepository());

const telemetry = (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> | void => {
  const { method, url } = request;
  const start = Date.now();

  response.on("finish", async () => {
    const { statusCode } = response;
    const duration = Date.now() - start;

    const telemetry = {
      route: url,
      method,
      duration,
      status: statusCode,
      createdAt: new Date(),
    };

    TelemetryContainer.logRequest(telemetry);
  });

  next();
};

export default telemetry;