import { HttpError } from "./http.error";

export class InvalidResourceError extends HttpError {
  constructor(resource: string) {
    super(404, `Resource ${resource} not found.`);
  }
}
