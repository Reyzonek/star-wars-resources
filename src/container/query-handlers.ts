import { asClass, AwilixContainer } from "awilix";
import { asArray } from "@tshio/awilix-resolver";

import GetFilmsQueryHandler from "../app/features/films/query-handlers/get-films.query.handler";
import GetPlanetsQueryHandler from "../app/features/planets/query-handlers/get-planets.query.handler";
import GetSpeciesQueryHandler from "../app/features/species/query-handlers/get-species.query.handler";
import GetStarshipsQueryHandler from "../app/features/starships/query-handlers/get-starships.query.handler";
import GetVehiclesQueryHandler from "../app/features/vehicles/query-handlers/get-vehicles.query.handler";
import GetFilmDetailsQueryHandler from "../app/features/films/query-handlers/get-film-details.query.handler";
import GetPlanetDetailsQueryHandler from "../app/features/planets/query-handlers/get-planet-details.query.handler";
import GetSpeciesDetailsQueryHandler from "../app/features/species/query-handlers/get-species-details.query.handler";
import GetStarshipDetailsQueryHandler from "../app/features/starships/query-handlers/get-starship-details.query.handler";
import GetVehicleDetailsQueryHandler from "../app/features/vehicles/query-handlers/get-vehicle-details.query.handler";
import GetWordsQueryHandler from "../app/features/films/query-handlers/get-words.query.handler";
// HANDLERS_IMPORTS

export async function registerQueryHandlers(container: AwilixContainer) {
  container.register({
    queryHandlers: asArray<any>([
      asClass(GetFilmsQueryHandler),
      asClass(GetPlanetsQueryHandler),
      asClass(GetSpeciesQueryHandler),
      asClass(GetStarshipsQueryHandler),
      asClass(GetVehiclesQueryHandler),
      asClass(GetFilmDetailsQueryHandler),
      asClass(GetPlanetDetailsQueryHandler),
      asClass(GetSpeciesDetailsQueryHandler),
      asClass(GetStarshipDetailsQueryHandler),
      asClass(GetVehicleDetailsQueryHandler),
      asClass(GetWordsQueryHandler),
      // QUERY_HANDLERS_SETUP
    ]),
  });

  return container;
}
