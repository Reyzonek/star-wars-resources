import express from "express";
import { Action } from "../../../shared/http/types";

import { getPlanetsActionValidation } from "./actions/get-planets.action";
// VALIDATION_IMPORTS

export interface FilmsRoutingDependencies {
  getPlanetsAction: Action;
  // ACTIONS_IMPORTS
}

export const planetsRouting = (actions: FilmsRoutingDependencies) => {
  const router = express.Router();

  router.get("/", [getPlanetsActionValidation], actions.getPlanetsAction.invoke.bind(actions.getPlanetsAction));
  // ACTIONS_SETUP

  return router;
};
