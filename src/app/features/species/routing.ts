import express from "express";
import { Action } from "../../../shared/http/types";

import { getSpeciesActionValidation } from "./actions/get-species.action";
// VALIDATION_IMPORTS

export interface SpeciesRoutingDependencies {
  getSpeciesAction: Action;
  // ACTIONS_IMPORTS
}

export const speciesRouting = (actions: SpeciesRoutingDependencies) => {
  const router = express.Router();

  router.get("/", [getSpeciesActionValidation], actions.getSpeciesAction.invoke.bind(actions.getSpeciesAction));
  // ACTIONS_SETUP

  return router;
};
