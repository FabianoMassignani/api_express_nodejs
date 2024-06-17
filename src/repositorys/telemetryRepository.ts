import { TelemetryIRepository } from "./telemetryIRepository";
import { Telemetry } from "../interfaces/telemetry/telemetry.interface";
import { TelemetryModel } from "../models";

class TelemetryRepository implements TelemetryIRepository {
  async logRequest(data: Telemetry): Promise<void> {
    await TelemetryModel.create(data);
  }
}

export default TelemetryRepository;
