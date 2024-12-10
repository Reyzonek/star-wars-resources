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

interface SwapiServiceDependencies {
  swapiClient: SwapiClient;
  appConfig: AppConfig;
  logger: Logger;
  filmRepository: Repository<FilmEntity>;
  speciesRepository: Repository<SpeciesEntity>;
}

export class SwapiService {
  constructor(private dependencies: SwapiServiceDependencies) {}

  public async sheduleGetAndSaveSwapiResources(): Promise<void> {
    const { appConfig } = this.dependencies;

    schedule.scheduleJob(appConfig.getSwapiResourceScheduleTime, async () => {
      await Promise.all([this.getAndSaveFilms(), this.getAndSaveSpecies()]);
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
        species: film.species.map((species: string) => this.getIdFromUrl(species)),
      }),
    );

    await filmRepository.save(filmEntities, { chunk: 20 });
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
      FilmEntity.create({
        ...spiecies,
        id: this.getIdFromUrl(spiecies.url),
        films: spiecies.films.map((film: string) => this.getIdFromUrl(film)),
      }),
    );

    await speciesRepository.save(speciesEntities, { chunk: 20 });
  }

  private getIdFromUrl(url: string): number {
    const match = url.match(/\/(\d+)\/$/);

    if (match) {
      return parseInt(match[1], 10);
    }

    throw new IdNotFoundError(url);
  }
}
