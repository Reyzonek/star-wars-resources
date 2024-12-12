import { AwilixContainer, asValue } from "awilix";
import { Logger } from "winston";
import { ContainerDependencies } from "../container";
import { dataSource } from "../config/db";
import { FilmEntity } from "../app/features/films/models/film.entity";
import { SpeciesEntity } from "../app/features/species/models/species.entity";
import { VehicleEntity } from "../app/features/vehicles/models/vehicle.entity";
import { StarshipEntity } from "../app/features/starships/models/starship.entity";
import { PlanetEntity } from "../app/features/planets/models/planet.entity";
// MODELS_IMPORTS

export async function registerDatabase(container: AwilixContainer, dependencies?: ContainerDependencies) {
  await dataSource.initialize();
  const dbDataSource = dependencies?.dbDataSource || dataSource;

  try {
    await dbDataSource.runMigrations();
  } catch (err) {
    (container.cradle.logger as Logger).debug(`Migrations: ${err}`);
    throw err;
  }
  container.register({
    dbDataSource: asValue(dbDataSource),
    filmRepository: asValue(dbDataSource.getRepository(FilmEntity)),
    speciesRepository: asValue(dbDataSource.getRepository(SpeciesEntity)),
    vehicleRepository: asValue(dbDataSource.getRepository(VehicleEntity)),
    starshipRepository: asValue(dbDataSource.getRepository(StarshipEntity)),
    planetRepository: asValue(dbDataSource.getRepository(PlanetEntity)),
    // MODELS_SETUP
  });
}
