import { AwilixContainer, Lifetime, asClass, asFunction } from "awilix";
import { filmsRouting } from "../app/features/films/routing";
// ROUTING_IMPORTS

export async function registerRouting(container: AwilixContainer) {
  container.loadModules(["src/app/**/*.action.js"], {
    formatName: "camelCase",
    resolverOptions: {
      lifetime: Lifetime.SCOPED,
      register: asClass,
    },
  });

  container.register({
    filmsRouting: asFunction(filmsRouting),
    // ROUTING_SETUP
  });

  return container;
}
