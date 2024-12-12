import { asClass, AwilixContainer } from "awilix";
import { asArray } from "@tshio/awilix-resolver";

import GetFilmsQueryHandler from "../app/features/films/query-handlers/get-films.query.handler";
import GetPlanetsQueryHandler from "../app/features/planets/query-handlers/get-planets.query.handler";
// HANDLERS_IMPORTS

export async function registerQueryHandlers(container: AwilixContainer) {
  container.register({
    queryHandlers: asArray<any>([
      asClass(GetFilmsQueryHandler),
      asClass(GetPlanetsQueryHandler),
      // QUERY_HANDLERS_SETUP
    ]),
  });

  return container;
}
