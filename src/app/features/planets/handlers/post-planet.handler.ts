import { CommandHandler } from "@tshio/command-bus";
import { Logger } from "@tshio/logger";
import { AppConfig } from "../../../../config/app";
import { POST_PLANET_COMMAND_TYPE, PostPlanetCommand } from "../commands/post-planet.command";
import { PlanetEntity } from "../models/planet.entity";
import { PlanetAlreadyExistsError } from "../../../../errors/planet-already-exists.error";
import { PlanetRepository } from "../repositories/planet.repository";

export interface PostPlanetHandlerDependencies {
  logger: Logger;
  planetRepository: PlanetRepository;
  appConfig: AppConfig;
}

export default class PostPlanetHandler implements CommandHandler<PostPlanetCommand> {
  public commandType: string = POST_PLANET_COMMAND_TYPE;

  constructor(private dependencies: PostPlanetHandlerDependencies) {}

  async execute({ payload }: PostPlanetCommand) {
    const { logger, planetRepository, appConfig } = this.dependencies;
    const newPlanetName = payload.name;
    logger.info("Command PostPlanet executed");

    const planetExists = await planetRepository.getPlanetByName(newPlanetName);

    if (planetExists) {
      throw new PlanetAlreadyExistsError(newPlanetName);
    }

    const minCustomPlanetId = Number(appConfig.minCustomPlanetId);

    const highestId = await planetRepository.getHighestCustomPlanetId();

    const id = highestId ? highestId + 1 : minCustomPlanetId;

    const newPlanet = await planetRepository.save(PlanetEntity.create({ id, ...payload }));

    logger.info(`Planet ${newPlanetName} with id: ${id} was added to database.`);

    return {
      planet: newPlanet,
    };
  }
}
