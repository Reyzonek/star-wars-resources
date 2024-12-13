import express from "express";
import { Action } from "../../../shared/http/types";

import { getPlanetsActionValidation } from "./actions/get-planets.action";
import { getPlanetDetailsActionValidation } from "./actions/get-planet-details.action";
// VALIDATION_IMPORTS

export interface PlanetsRoutingDependencies {
  getPlanetsAction: Action;
  getPlanetDetailsAction: Action;
  // ACTIONS_IMPORTS
}

export const planetsRouting = (actions: PlanetsRoutingDependencies) => {
  const router = express.Router();

  router.get("/", [getPlanetsActionValidation], actions.getPlanetsAction.invoke.bind(actions.getPlanetsAction));
  router.get(
    "/:id",
    [getPlanetDetailsActionValidation],
    actions.getPlanetDetailsAction.invoke.bind(actions.getPlanetDetailsAction),
  );
  // ACTIONS_SETUP

  return router;
};
