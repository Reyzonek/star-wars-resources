import { HttpError } from "./http.error";

export class IdNotFoundError extends HttpError {
  constructor(url: string) {
    super(404, `Id was not found in url ${url}.`);
  }
}
