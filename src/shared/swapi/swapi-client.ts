import axios from "axios";
import { AppConfig } from "../../config/app";
import { SwapiPath } from "./swapi-path.enum";

export interface SwapiClientDependencies {
  appConfig: AppConfig;
}

export class SwapiClient {
  private dependencies: SwapiClientDependencies;

  public get(path: SwapiPath) {
    const url = `${this.dependencies.appConfig.swapiBaseUrl}/${path}`;

    return axios.get(url);
  }
}
