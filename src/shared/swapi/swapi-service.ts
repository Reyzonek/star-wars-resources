import schedule from "node-schedule";
import { Logger } from "@tshio/logger";
import { Repository } from "typeorm";
import GetFilmDetailsQueryHandler from "../../app/features/films/query-handlers/get-film-details.query.handler";
import GetPlanetsQueryHandler from "../../app/features/planets/query-handlers/get-planets.query.handler";
import GetPlanetDetailsQueryHandler from "../../app/features/planets/query-handlers/get-planet-details.query.handler";
import GetSpeciesQueryHandler from "../../app/features/species/query-handlers/get-species.query.handler";
import GetSpeciesDetailsQueryHandler from "../../app/features/species/query-handlers/get-species-details.query.handler";
import { AppConfig } from "../../config/app";
import { SwapiClient } from "./swapi-client";
import { SwapiResource } from "../constants/swapi-resource.enum";
import { FilmEntity } from "../../app/features/films/models/film.entity";
import { IdNotFoundError } from "../../errors/id-not-found-error";
import { SpeciesEntity } from "../../app/features/species/models/species.entity";
import { VehicleEntity } from "../../app/features/vehicles/models/vehicle.entity";
import { StarshipEntity } from "../../app/features/starships/models/starship.entity";
import { PlanetEntity } from "../../app/features/planets/models/planet.entity";
import { flushCachedQueries } from "../cache-decorator/flush-query-cache-decorator";
import GetFilmsQueryHandler from "../../app/features/films/query-handlers/get-films.query.handler";
import GetStarshipsQueryHandler from "../../app/features/starships/query-handlers/get-starships.query.handler";
import GetStarshipDetailsQueryHandler from "../../app/features/starships/query-handlers/get-starship-details.query.handler";
import GetVehiclesQueryHandler from "../../app/features/vehicles/query-handlers/get-vehicles.query.handler";
import GetVehicleDetailsQueryHandler from "../../app/features/vehicles/query-handlers/get-vehicle-details.query.handler";
import { PeopleEntity } from "../../app/features/people/models/people.entity";

interface SwapiServiceDependencies {
  swapiClient: SwapiClient;
  appConfig: AppConfig;
  logger: Logger;
  filmRepository: Repository<FilmEntity>;
  speciesRepository: Repository<SpeciesEntity>;
  vehicleRepository: Repository<VehicleEntity>;
  starshipRepository: Repository<StarshipEntity>;
  planetRepository: Repository<PlanetEntity>;
  peopleRepository: Repository<PeopleEntity>;
}

export class SwapiService {
  constructor(private dependencies: SwapiServiceDependencies) {}

  public async sheduleGetAndSaveSwapiResources(): Promise<void> {
    const { appConfig } = this.dependencies;

    schedule.scheduleJob(appConfig.getSwapiResourceScheduleTime, async () => {
      await Promise.all([
        this.getAndSaveFilms(),
        this.getAndSaveSpecies(),
        this.getAndSaveVehicles(),
        this.getAndSaveStarships(),
        this.getAndSavePlanets(),
        this.getAndSavePeople(),
      ]);

      await flushCachedQueries({
        handlers: [
          GetFilmsQueryHandler,
          GetFilmDetailsQueryHandler,
          GetPlanetsQueryHandler,
          GetPlanetDetailsQueryHandler,
          GetSpeciesQueryHandler,
          GetSpeciesDetailsQueryHandler,
          GetStarshipsQueryHandler,
          GetStarshipDetailsQueryHandler,
          GetVehiclesQueryHandler,
          GetVehicleDetailsQueryHandler,
        ],
      });
    });
  }

  private async getAndSaveFilms(): Promise<void> {
    const { swapiClient, logger, filmRepository } = this.dependencies;

    const filmsFromSwapi = await swapiClient.get(SwapiResource.FILMS);

    const filmEntities: FilmEntity[] = filmsFromSwapi.map((film: any) =>
      FilmEntity.create({
        ...film,
        id: this.getIdFromUrl(film.url),
      }),
    );

    await filmRepository.save(filmEntities);
    logger.info(`Saved films: ${filmEntities.map((film) => film.title).join(", ")}`);
  }

  private async getAndSaveSpecies(): Promise<void> {
    const { swapiClient, logger, speciesRepository } = this.dependencies;

    const speciesFromSwapi = await swapiClient.get(SwapiResource.SPECIES);

    const speciesEntities: SpeciesEntity[] = speciesFromSwapi.map((spiecies: any) =>
      SpeciesEntity.create({
        ...spiecies,
        id: this.getIdFromUrl(spiecies.url),
      }),
    );

    await speciesRepository.save(speciesEntities);
    logger.info(`Saved species: ${speciesEntities.map((species) => species.name).join(", ")}`);
  }

  private async getAndSaveVehicles(): Promise<void> {
    const { swapiClient, logger, vehicleRepository } = this.dependencies;

    const vehiclesFromSwapi = await swapiClient.get(SwapiResource.VEHICLES);

    const vehiclesEntities: VehicleEntity[] = vehiclesFromSwapi.map((vehicle: any) =>
      VehicleEntity.create({
        ...vehicle,
        id: this.getIdFromUrl(vehicle.url),
      }),
    );

    await vehicleRepository.save(vehiclesEntities);
    logger.info(`Saved vehicles: ${vehiclesEntities.map((vehicle) => vehicle.name).join(", ")}`);
  }

  private async getAndSaveStarships(): Promise<void> {
    const { swapiClient, logger, starshipRepository } = this.dependencies;

    const starshipsFromSwapi = await swapiClient.get(SwapiResource.STARSHIPS);

    const starshipsEntities: StarshipEntity[] = starshipsFromSwapi.map((starship: any) =>
      StarshipEntity.create({
        ...starship,
        id: this.getIdFromUrl(starship.url),
      }),
    );

    await starshipRepository.save(starshipsEntities);
    logger.info(`Saved starships: ${starshipsEntities.map((starship) => starship.name).join(", ")}`);
  }

  private async getAndSavePlanets(): Promise<void> {
    const { swapiClient, logger, peopleRepository } = this.dependencies;

    const peopleFromSwapi: PeopleEntity[] = await swapiClient.get(SwapiResource.PEOPLE);

    const peopleEntities = peopleFromSwapi.map((people: any) =>
      PeopleEntity.create({
        ...people,
        id: this.getIdFromUrl(people.url),
      }),
    );

    await peopleRepository.save(peopleEntities);
    logger.info(`Saved people: ${peopleEntities.map((planet) => planet.name).join(", ")}`);
  }

  private async getAndSavePeople(): Promise<void> {
    const { swapiClient, logger, planetRepository } = this.dependencies;

    const planetsFromSwapi: PlanetEntity[] = await swapiClient.get(SwapiResource.PLANETS);

    const planetsEntities = planetsFromSwapi.map((planet: any) =>
      PlanetEntity.create({
        ...planet,
        id: this.getIdFromUrl(planet.url),
      }),
    );

    await planetRepository.save(planetsEntities);
    logger.info(`Saved planets: ${planetsEntities.map((planet) => planet.name).join(", ")}`);
  }

  private getIdFromUrl(url: string): number {
    const match = url.match(/\/(\d+)\/$/);

    if (match) {
      return parseInt(match[1], 10);
    }

    throw new IdNotFoundError(url);
  }
}
