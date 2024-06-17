export interface Telemetry {
  route: string;
  method: string;
  duration: number;
  status?: number;
  error?: string;
  stack?: string;
  createdAt: Date;
}
