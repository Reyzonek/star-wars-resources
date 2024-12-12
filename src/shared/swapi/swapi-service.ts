import schedule from "node-schedule";
import { Logger } from "@tshio/logger";
import { Repository } from "typeorm";
import { AppConfig } from "../../config/app";
import { SwapiClient } from "./swapi-client";
import { SwapiResource } from "./swapi-path.enum";
import { SwapiClientError } from "../../errors/swapi-client.error";
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

    let films = [];

    try {
      const filmsFromSwapi = await swapiClient.get(SwapiResource.FILMS);
      films = filmsFromSwapi.data.results;
    } catch (error) {
      logger.error(error as any);
      throw new SwapiClientError(SwapiResource.FILMS);
    }

    const filmEntities = films.map((film: any) =>
      FilmEntity.create({
        ...film,
        id: this.getIdFromUrl(film.url),
      }),
    );

    await filmRepository.save(filmEntities);
  }

  private async getAndSaveSpecies(): Promise<void> {
    const { swapiClient, logger, speciesRepository } = this.dependencies;

    let species = [];

    try {
      const speciesFromSwapi = await swapiClient.get(SwapiResource.SPECIES);
      species = speciesFromSwapi.data.results;
    } catch (error) {
      logger.error(error as any);
      throw new SwapiClientError(SwapiResource.SPECIES);
    }

    const speciesEntities = species.map((spiecies: any) =>
      SpeciesEntity.create({
        ...spiecies,
        id: this.getIdFromUrl(spiecies.url),
      }),
    );

    await speciesRepository.save(speciesEntities);
  }

  private async getAndSaveVehicles(): Promise<void> {
    const { swapiClient, logger, vehicleRepository } = this.dependencies;

    let vehicles = [];

    try {
      const vehiclesFromSwapi = await swapiClient.get(SwapiResource.VEHICLES);
      vehicles = vehiclesFromSwapi.data.results;
    } catch (error) {
      logger.error(error as any);
      throw new SwapiClientError(SwapiResource.VEHICLES);
    }

    const vehiclesEntities = vehicles.map((vehicle: any) =>
      VehicleEntity.create({
        ...vehicle,
        id: this.getIdFromUrl(vehicle.url),
      }),
    );

    await vehicleRepository.save(vehiclesEntities);
  }

  private async getAndSaveStarships(): Promise<void> {
    const { swapiClient, logger, starshipRepository } = this.dependencies;

    let starships = [];

    try {
      const starshipsFromSwapi = await swapiClient.get(SwapiResource.STARSHIPS);
      starships = starshipsFromSwapi.data.results;
    } catch (error) {
      logger.error(error as any);
      throw new SwapiClientError(SwapiResource.STARSHIPS);
    }

    const starshipsEntities = starships.map((starship: any) =>
      StarshipEntity.create({
        ...starship,
        id: this.getIdFromUrl(starship.url),
      }),
    );

    await starshipRepository.save(starshipsEntities);
  }

  private async getAndSavePlanets(): Promise<void> {
    const { swapiClient, logger, planetRepository } = this.dependencies;

    let planets = [];

    try {
      const planetsFromSwapi = await swapiClient.get(SwapiResource.PLANETS);
      planets = planetsFromSwapi.data.results;
    } catch (error) {
      logger.error(error as any);
      throw new SwapiClientError(SwapiResource.PLANETS);
    }

    const planetsEntities = planets.map((planet: any) =>
      PlanetEntity.create({
        ...planet,
        id: this.getIdFromUrl(planet.url),
      }),
    );

    await planetRepository.save(planetsEntities);
  }

  private getIdFromUrl(url: string): number {
    const match = url.match(/\/(\d+)\/$/);

    if (match) {
      return parseInt(match[1], 10);
    }

    throw new IdNotFoundError(url);
  }
}
