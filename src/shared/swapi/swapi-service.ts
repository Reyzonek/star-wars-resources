import schedule from "node-schedule";
import { Logger } from "@tshio/logger";
import { Repository } from "typeorm";
import { AppConfig } from "../../config/app";
import { SwapiClient } from "./swapi-client";
import { SwapiResource } from "./swapi-path.enum";
import { FilmEntity } from "../../app/features/films/models/film.entity";
import { IdNotFoundError } from "../../errors/id-not-found-error";
import { SpeciesEntity } from "../../app/features/species/models/species.entity";
import { VehicleEntity } from "../../app/features/vehicles/models/vehicle.entity";
import { StarshipEntity } from "../../app/features/starships/models/starship.entity";
import { PlanetEntity } from "../../app/features/planets/models/planet.entity";

interface SwapiServiceDependencies {
  swapiClient: SwapiClient;
  appConfig: AppConfig;
  logger: Logger;
  filmRepository: Repository<FilmEntity>;
  speciesRepository: Repository<SpeciesEntity>;
  vehicleRepository: Repository<VehicleEntity>;
  starshipRepository: Repository<StarshipEntity>;
  planetRepository: Repository<PlanetEntity>;
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
      ]);
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
