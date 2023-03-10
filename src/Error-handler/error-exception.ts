import { ErrorCode } from "./error-code";

export class ErrorException extends Error {
  public status: number = null;
  public metaData: any = null;
  constructor(
    code: string = ErrorCode.INTERNAL_SERVER_ERROR,
    metaData: any = null
  ) {
    super(code);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = code;
    this.status = 500;
    this.metaData = metaData;
    switch (code) {
      case ErrorCode.Unauthenticated:
        this.status = 401;
        break;
      case ErrorCode.FOBIDDEN_ERROR:
        this.status = 403;
        break;
      case ErrorCode.NO_CONTENT:
        this.status = 204;
        break;
      case ErrorCode.AsyncError:
        this.status = 400;
        break;
      case ErrorCode.CONFLIT:
        this.status = 409;
        break;
      case ErrorCode.VALIDATE_ERROR:
        this.status = 406;
        break;
      case ErrorCode.NotFound:
        this.status = 404;
        break;
      default:
        this.status = 500;
        break;
    }
  }
}
