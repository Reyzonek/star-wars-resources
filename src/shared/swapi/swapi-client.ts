import axios from "axios";
import { AppConfig } from "../../config/app";
import { SwapiResource } from "./swapi-path.enum";

export interface SwapiClientDependencies {
  appConfig: AppConfig;
}

export class SwapiClient {
  constructor(private dependencies: SwapiClientDependencies) {}

  public get(path: SwapiResource) {
    const url = `${this.dependencies.appConfig.swapiBaseUrl}/${path}`;

    return axios.get(url);
  }
}
