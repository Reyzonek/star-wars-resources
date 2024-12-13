import express from "express";
import { Action } from "../../../shared/http/types";

import { getStarshipsActionValidation } from "./actions/get-starships.action";
// VALIDATION_IMPORTS

export interface StarshipsRoutingDependencies {
  getStarshipsAction: Action;
  // ACTIONS_IMPORTS
}

export const starshipsRouting = (actions: StarshipsRoutingDependencies) => {
  const router = express.Router();

  router.get("/", [getStarshipsActionValidation], actions.getStarshipsAction.invoke.bind(actions.getStarshipsAction));
  // ACTIONS_SETUP

  return router;
};
