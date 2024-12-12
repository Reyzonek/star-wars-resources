import express from "express";
import { Action } from "../../../shared/http/types";

import { getFilmsActionValidation } from "./actions/get-films.action";
// VALIDATION_IMPORTS

export interface FilmsRoutingDependencies {
  getFilmsAction: Action;
  // ACTIONS_IMPORTS
}

export const filmsRouting = (actions: FilmsRoutingDependencies) => {
  const router = express.Router();

  router.get("/", [getFilmsActionValidation], actions.getFilmsAction.invoke.bind(actions.getFilmsAction));
  // ACTIONS_SETUP

  return router;
};
