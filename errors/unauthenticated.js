import { CustomErrorAPI } from "./custom-error.js";
import StatusCodes from "http-status-codes";

export class UnauthenticatedError extends CustomErrorAPI {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
