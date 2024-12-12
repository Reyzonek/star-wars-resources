import axios from "axios";
import { Logger } from "@tshio/logger";
import { AppConfig } from "../../config/app";
import { SwapiResource } from "./swapi-path.enum";
import { SwapiClientError } from "../../errors/swapi-client.error";

export interface SwapiClientDependencies {
  appConfig: AppConfig;
  logger: Logger;
}

export class SwapiClient {
  constructor(private dependencies: SwapiClientDependencies) {}

  public async get(path: SwapiResource) {
    const url = `${this.dependencies.appConfig.swapiBaseUrl}/${path}`;

    let resource = [];

    try {
      const resourceFromSwapi = await axios.get(url);
      resource = resourceFromSwapi.data.results;
    } catch (error) {
      this.dependencies.logger.error(error as any);
      throw new SwapiClientError(path);
    }

    return resource;
  }
}
