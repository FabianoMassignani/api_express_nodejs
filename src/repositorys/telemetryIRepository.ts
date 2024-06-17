import { Telemetry } from "../interfaces/telemetry/telemetry.interface";

export interface TelemetryIRepository {
  logRequest(data: Telemetry): Promise<void>;
}
