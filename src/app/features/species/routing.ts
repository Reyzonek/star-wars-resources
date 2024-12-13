import express from "express";
import { Action } from "../../../shared/http/types";

import { getSpeciesActionValidation } from "./actions/get-species.action";
import { getSpeciesDetailsActionValidation } from "./actions/get-species-details.action";
// VALIDATION_IMPORTS

export interface SpeciesRoutingDependencies {
  getSpeciesAction: Action;
  getSpeciesDetailsAction: Action;
  // ACTIONS_IMPORTS
}

export const speciesRouting = (actions: SpeciesRoutingDependencies) => {
  const router = express.Router();

  router.get("/", [getSpeciesActionValidation], actions.getSpeciesAction.invoke.bind(actions.getSpeciesAction));
  router.get(
    "/:id",
    [getSpeciesDetailsActionValidation],
    actions.getSpeciesDetailsAction.invoke.bind(actions.getSpeciesDetailsAction),
  );
  // ACTIONS_SETUP

  return router;
};
