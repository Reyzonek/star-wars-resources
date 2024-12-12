import { SwapiResource } from "../shared/swapi/swapi-path.enum";
import { HttpError } from "./http.error";

export class SwapiClientError extends HttpError {
  constructor(resource: SwapiResource) {
    super(424, `Could not import ${resource} from Swapi.`);
  }
}
