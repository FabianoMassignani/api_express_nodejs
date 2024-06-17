import { TelemetryIRepository } from "../repositorys/telemetryIRepository";
import { Telemetry } from "../interfaces/telemetry/telemetry.interface";

class TelemetryService {
  private telemetryRepository: TelemetryIRepository;

  constructor(telemetryRepository: TelemetryIRepository) {
    this.telemetryRepository = telemetryRepository;
  }

  async logRequest(data: Telemetry) {
    await this.telemetryRepository.logRequest(data);
  }
}

export default TelemetryService;
