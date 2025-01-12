import { StatusCodes } from "http-status-codes";
import { HttpError } from "./http.error";

export class PlanetNotFoundError extends HttpError {
  constructor(id: number) {
    super(StatusCodes.NOT_FOUND, `Planet with id: ${id} was not found.`);
  }
}
