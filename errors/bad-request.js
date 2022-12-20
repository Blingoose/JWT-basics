import { CustomErrorAPI } from "./custom-error.js";
import StatusCodes from "http-status-codes";

export class BadRequest extends CustomErrorAPI {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
