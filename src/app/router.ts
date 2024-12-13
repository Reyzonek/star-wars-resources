import express from "express";

export interface RoutingDependencies {
  filmsRouting: express.Router;
  planetsRouting: express.Router;
  speciesRouting: express.Router;
  starshipsRouting: express.Router;
  vehiclesRouting: express.Router;
  // ROUTES_INTERFACE
}

export const createRouter = ({
  filmsRouting,
  planetsRouting,
  speciesRouting,
  starshipsRouting,
  vehiclesRouting,
  // ROUTES_DEPENDENCIES
}: RoutingDependencies) => {
  const router = express.Router();

  router.use("/films", filmsRouting);
  router.use("/planets", planetsRouting);
  router.use("/species", speciesRouting)
  router.use("/starships", starshipsRouting)
  router.use("/vehicles", vehiclesRouting)
  // ROUTES_CONFIG
  return router;
};
