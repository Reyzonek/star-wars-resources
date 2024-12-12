import { HttpError } from "./http.error";

export class InvalidResourceError extends HttpError {
  constructor() {
    super(404, "Resource was not found.");
  }
}
