import express from "express";

export interface RoutingDependencies {
  filmsRouting: express.Router;
  planetsRouting: express.Router;
  // ROUTES_INTERFACE
}

export const createRouter = ({
  filmsRouting,
  planetsRouting,
  // ROUTES_DEPENDENCIES
}: RoutingDependencies) => {
  const router = express.Router();

  router.use("/films", filmsRouting);
  router.use("/planets", planetsRouting);
  // ROUTES_CONFIG
  return router;
};
