import { AwilixContainer, Lifetime, asClass, asFunction } from "awilix";
import { filmsRouting } from "../app/features/films/routing";
import { planetsRouting } from "../app/features/planets/routing";
import { speciesRouting } from "../app/features/species/routing";
import { starshipsRouting } from "../app/features/starships/routing";
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
    speciesRouting: asFunction(speciesRouting),
    starshipsRouting: asFunction(starshipsRouting),
    // ROUTING_SETUP
  });

  return container;
}
