import { StatusCodes } from "http-status-codes";
import { HttpError } from "./http.error";

export class PlanetAlreadyExistsError extends HttpError {
  constructor(name: string) {
    super(StatusCodes.CONFLICT, `Planet with name: ${name} already exists.`);
  }
}
