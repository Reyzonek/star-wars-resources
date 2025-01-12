import { asClass, AwilixContainer } from "awilix";
import { asArray } from "@tshio/awilix-resolver";

import PostPlanetCommandHandler from "../app/features/planets/handlers/post-planet.handler";
import UpdatePlanetCommandHandler from "../app/features/planets/handlers/update-planet.handler";
// HANDLERS_IMPORTS

export async function registerCommandHandlers(container: AwilixContainer) {
  container.register({
    commandHandlers: asArray<any>([
      asClass(PostPlanetCommandHandler),
      asClass(UpdatePlanetCommandHandler),
      // COMMAND_HANDLERS_SETUP
    ]),
  });

  return container;
}
