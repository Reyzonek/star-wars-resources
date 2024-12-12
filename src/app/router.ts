import express from "express";

export interface RoutingDependencies {
  filmsRouting: express.Router;
  planetsRouting: express.Router;
  speciesRouting: express.Router;
  // ROUTES_INTERFACE
}

export const createRouter = ({
  filmsRouting,
  planetsRouting,
  speciesRouting,
  // ROUTES_DEPENDENCIES
}: RoutingDependencies) => {
  const router = express.Router();

  router.use("/films", filmsRouting);
  router.use("/planets", planetsRouting);
  router.use("/species", speciesRouting)
  // ROUTES_CONFIG
  return router;
};
