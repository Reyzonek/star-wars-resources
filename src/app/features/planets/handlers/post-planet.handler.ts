import { CommandHandler } from "@tshio/command-bus";
import { Logger } from "@tshio/logger";
import { Repository } from "typeorm";
import { POST_PLANET_COMMAND_TYPE, PostPlanetCommand } from "../commands/post-planet.command";
import { PlanetEntity } from "../models/planet.entity";
import { PlanetAlreadyExistsError } from "../../../../errors/planet-already-exists.error";

export interface PostPlanetHandlerDependencies {
  logger: Logger;
  planetRepository: Repository<PlanetEntity>;
}

export default class PostPlanetHandler implements CommandHandler<PostPlanetCommand> {
  public commandType: string = POST_PLANET_COMMAND_TYPE;

  constructor(private dependencies: PostPlanetHandlerDependencies) {}

  async execute({ payload }: PostPlanetCommand) {
    const { logger, planetRepository } = this.dependencies;
    const newPlanetName = payload.name;
    logger.info("Command PostPlanet executed");

    const planetExists = await planetRepository.findOne({
      where: { name: newPlanetName },
    });

    if (planetExists) {
      throw new PlanetAlreadyExistsError(newPlanetName);
    }

    const customPlanetMinId = 1000;

    const { highestId } = await planetRepository
      .createQueryBuilder("planet")
      .select("MAX(planet.id)", "highestId")
      .where(`id >= ${customPlanetMinId}`)
      .getRawOne();

    const id = highestId ? highestId + 1 : customPlanetMinId;

    const newPlanet = await planetRepository.save(PlanetEntity.create({ id, ...payload }));

    logger.info(`Planet ${newPlanetName} with id: ${id} was added to database.`);

    return {
      planet: newPlanet,
    };
  }
}
