import { AwilixContainer, Lifetime, asClass, asFunction } from "awilix";
import { filmsRouting } from "../app/features/films/routing";
import { planetsRouting } from "../app/features/planets/routing";
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
    planetsRouting: asFunction(planetsRouting),
    // ROUTING_SETUP
  });

  return container;
}
