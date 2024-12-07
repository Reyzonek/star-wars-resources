import schedule from "node-schedule";
import { AppConfig } from "../../config/app";
import { SwapiClient } from "./swapi-client";
import { SwapiPath } from "./swapi-path.enum";

interface SwapiServiceDependencies {
  swapiClient: SwapiClient;
  appConfig: AppConfig;
}

export class SwapiService {
  constructor(private dependencies: SwapiServiceDependencies) {}

  public async sheduleGetAndSaveSwapiResources() {
    const { swapiClient, appConfig } = this.dependencies;

    schedule.scheduleJob(appConfig.getSwapiResourceScheduleTime, async () => {
      await swapiClient.get(SwapiPath.FILMS);
    });
  }
}
