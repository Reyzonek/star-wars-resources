import express from "express";
import { Action } from "../../../shared/http/types";

import { getStarshipsActionValidation } from "./actions/get-starships.action";
import { getStarshipDetailsActionValidation } from "./actions/get-starship-details.action";
// VALIDATION_IMPORTS

export interface StarshipsRoutingDependencies {
  getStarshipsAction: Action;
  getStarshipDetailsAction: Action;
  // ACTIONS_IMPORTS
}

export const starshipsRouting = (actions: StarshipsRoutingDependencies) => {
  const router = express.Router();

  router.get("/", [getStarshipsActionValidation], actions.getStarshipsAction.invoke.bind(actions.getStarshipsAction));
  router.get(
    "/:id",
    [getStarshipDetailsActionValidation],
    actions.getStarshipDetailsAction.invoke.bind(actions.getStarshipDetailsAction),
  );
  // ACTIONS_SETUP

  return router;
};
