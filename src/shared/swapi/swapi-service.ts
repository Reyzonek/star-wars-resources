import schedule from "node-schedule";
import { Logger } from "@tshio/logger";
import { Repository } from "typeorm";
import { AppConfig } from "../../config/app";
import { SwapiClient } from "./swapi-client";
import { SwapiResource } from "./swapi-path.enum";
import { SwapiClientError } from "../../errors/swapi-client.error";
import { FilmEntity } from "../../app/features/films/models/film.entity";
import { InvalidResourceError } from "../../errors/invalid-resource.error";
import { IdNotFoundError } from "../../errors/id-not-found-error";

interface SwapiServiceDependencies {
  swapiClient: SwapiClient;
  appConfig: AppConfig;
  logger: Logger;
  filmRepository: Repository<FilmEntity>;
}

type ResultsType = FilmEntity[];

interface SwapiResourceInterface {
  resource: SwapiResource;
  results: ResultsType;
}

export class SwapiService {
  constructor(private dependencies: SwapiServiceDependencies) {}

  public async sheduleGetAndSaveSwapiResources(): Promise<void> {
    const { appConfig } = this.dependencies;

    schedule.scheduleJob(appConfig.getSwapiResourceScheduleTime, async () => {
      const swapiResources: SwapiResourceInterface[] = await Promise.all(
        Object.values(SwapiResource).map(async (resource) => {
          const results = await this.getResourceFromSwapi(resource);
          return { resource, results };
        }),
      );

      await this.saveResources(swapiResources);
    });
  }

  private async getResourceFromSwapi(resource: SwapiResource): Promise<ResultsType> {
    const { swapiClient, logger } = this.dependencies;

    let results: ResultsType = [];

    try {
      const resourceFromSwapi = await swapiClient.get(resource);
      results = resourceFromSwapi.data.results;
    } catch (error) {
      logger.error(error as any);
      throw new SwapiClientError(resource);
    }

    return results;
  }

  private async saveResources(swapiResources: SwapiResourceInterface[]): Promise<void> {
    await Promise.all(
      swapiResources.map(async (swapiResource) => {
        const { results, resource } = swapiResource;
        const { filmRepository, logger } = this.dependencies;

        switch (resource) {
          case SwapiResource.FILMS: {
            const filmEntities = results.map((result) =>
              FilmEntity.create({ ...result, id: this.getIdFromUrl(result.url) }),
            );
            await filmRepository.save(filmEntities, { chunk: 20 });
            logger.info(`Saved films: ${results.map((result) => result.title).join(",")}`);
            break;
          }
          default:
            throw new InvalidResourceError(resource);
        }
      }),
    );
  }

  private getIdFromUrl(url: string): number {
    const match = url.match(/\/(\d+)\/$/);

    if (match) {
      return parseInt(match[1], 10);
    }

    throw new IdNotFoundError(url);
  }
}
