import { ErrorCode, HttpException } from "./root";

export class NotFound extends HttpException {
  constructor(message: string, errorCode: ErrorCode) {
    super(message + " não encontrado!", errorCode, 404, null);
  }
}
