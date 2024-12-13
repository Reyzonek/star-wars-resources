import { SwapiResource } from "../shared/constants/swapi-resource.enum";
import { HttpError } from "./http.error";

export class SwapiClientError extends HttpError {
  constructor(resource: SwapiResource) {
    super(424, `Could not import ${resource} from Swapi.`);
  }
}
