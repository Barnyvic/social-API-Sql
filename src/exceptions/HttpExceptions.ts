import { HttpCode } from "../utils/Httpcode";

class HttpException extends Error {
  public message: string;
  public status: HttpCode;

  constructor(message: string, status: HttpCode) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export default HttpException;
