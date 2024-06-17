import { model, Schema, Document } from "mongoose";
import { Telemetry } from "../interfaces/telemetry/telemetry.interface";

const TelemetrySchema: Schema = new Schema({
  route: { type: String, required: true },
  method: { type: String, required: true },
  status: { type: Number },
  duration: { type: Number },
  error: { type: String },
  stack: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const TelemetryModel = model<Telemetry & Document>(
  "telemetry",
  TelemetrySchema
);
