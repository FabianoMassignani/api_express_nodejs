export class HttpException extends Error {
  statusCode: number;
  message: string;
  errorCode: number;
  errors: ErrorCode;

  constructor(
    message: string,
    errorCode: ErrorCode,
    statusCode: number,
    errors: any
  ) {
    super(message);

    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export enum ErrorCode {
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  INVALID_PARAMS = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  DUPLICATE_ENTRY = 409,
  INVALID_PASSWORD = 401,
  INTERNAL_SERVER = 500,
}
