import express from "express";
import { Action } from "../../../shared/http/types";

import { getPlanetsActionValidation } from "./actions/get-planets.action";
import { getPlanetDetailsActionValidation } from "./actions/get-planet-details.action";
import { postPlanetActionValidation } from "./actions/post-planet.action";
import { updatePlanetActionValidation } from "./actions/update-planet.action";
// VALIDATION_IMPORTS

export interface PlanetsRoutingDependencies {
  getPlanetsAction: Action;
  getPlanetDetailsAction: Action;
  postPlanetAction: Action;
  updatePlanetAction: Action;
  // ACTIONS_IMPORTS
}

export const planetsRouting = (actions: PlanetsRoutingDependencies) => {
  const router = express.Router();

  router.get("/", [getPlanetsActionValidation], actions.getPlanetsAction.invoke.bind(actions.getPlanetsAction));

  router.post("/planet", [postPlanetActionValidation], actions.postPlanetAction.invoke.bind(actions.postPlanetAction));

  router.get(
    "/:id",
    [getPlanetDetailsActionValidation],
    actions.getPlanetDetailsAction.invoke.bind(actions.getPlanetDetailsAction),
  );

  router.patch(
    "/:id",
    [updatePlanetActionValidation],
    actions.updatePlanetAction.invoke.bind(actions.updatePlanetAction),
  );
  // ACTIONS_SETUP

  return router;
};
