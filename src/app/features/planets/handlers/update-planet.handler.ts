import { CommandHandler } from "@tshio/command-bus";
import { Logger } from "@tshio/logger";
import { UPDATE_PLANET_COMMAND_TYPE, UpdatePlanetCommand } from "../commands/update-planet.command";
import { PlanetAlreadyExistsError } from "../../../../errors/planet-already-exists.error";
import { PlanetRepository } from "../repositories/planet.repository";
import { PlanetEntity } from "../models/planet.entity";

export interface UpdatePlanetHandlerDependencies {
  logger: Logger;
  planetRepository: PlanetRepository;
}

export default class UpdatePlanetHandler implements CommandHandler<UpdatePlanetCommand> {
  public commandType: string = UPDATE_PLANET_COMMAND_TYPE;

  constructor(private dependencies: UpdatePlanetHandlerDependencies) {}

  async execute({ payload }: UpdatePlanetCommand) {
    const { logger, planetRepository } = this.dependencies;
    logger.info("Command UpdatePlanet executed");

    const newPlanetName = payload.name;

    if (newPlanetName) {
      const planetExists = await planetRepository.getPlanetByName(newPlanetName);

      if (planetExists) {
        throw new PlanetAlreadyExistsError(newPlanetName);
      }
    }

    const planetToUpdate = await planetRepository.getPlanetById(payload.id);

    const updatedPlanet = await planetRepository.save(PlanetEntity.create({ ...planetToUpdate, ...payload }));

    logger.info(`Planet with id: ${payload.id} was updated.`);

    return {
      planet: updatedPlanet,
    };
  }
}
