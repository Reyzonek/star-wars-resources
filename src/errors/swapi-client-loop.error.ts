import { SwapiResource } from "../shared/swapi/swapi-path.enum";
import { HttpError } from "./http.error";

export class SwapiClientLoopError extends HttpError {
  constructor(resource: SwapiResource) {
    super(400, `Something went wrong while importing ${resource}. There is to many resources.`);
  }
}
