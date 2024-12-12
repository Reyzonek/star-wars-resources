import express from "express";

export interface RoutingDependencies {
  filmsRouting: express.Router;
  // ROUTES_INTERFACE
}

export const createRouter = ({
  filmsRouting,
  // ROUTES_DEPENDENCIES
}: RoutingDependencies) => {
  const router = express.Router();

  router.use("/films", filmsRouting);
  // ROUTES_CONFIG
  return router;
};
