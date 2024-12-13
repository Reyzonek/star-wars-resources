import { SwapiResource } from "../shared/swapi/swapi-path.enum";
import { HttpError } from "./http.error";

export class ResourceNotFoundError extends HttpError {
  constructor(resource: SwapiResource, id: number) {
    super(404, `Resource from ${resource} table with id ${id} was not found.`);
  }
}
