import { ErrorCode, HttpException } from "./root";

export class BadRequest extends HttpException {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, errorCode, 400, null);
  }
}
