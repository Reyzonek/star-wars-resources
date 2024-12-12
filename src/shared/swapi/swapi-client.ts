import axios from "axios";
import { Logger } from "@tshio/logger";
import { AppConfig } from "../../config/app";
import { SwapiResource } from "./swapi-path.enum";
import { SwapiClientError } from "../../errors/swapi-client.error";
import { SwapiClientLoopError } from "../../errors/swapi-client-loop.error";

export interface SwapiClientDependencies {
  appConfig: AppConfig;
  logger: Logger;
}

export class SwapiClient {
  constructor(private dependencies: SwapiClientDependencies) {}

  public async get(path: SwapiResource) {
    const allResources: any = [];
    const urls = [`${this.dependencies.appConfig.swapiBaseUrl}/${path}`];

    // eslint-disable-next-line no-restricted-syntax
    for (const url of urls) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const resourceFromSwapi = await axios.get(url);
        const { results, next } = resourceFromSwapi.data;
        allResources.push(results);

        if (next) {
          urls.push(next);
        }

        if (allResources.length > 100) {
          throw new SwapiClientLoopError(path);
        }
      } catch (error) {
        this.dependencies.logger.error(error as any);
        throw new SwapiClientError(path);
      }
    }

    return allResources.flat();
  }
}
