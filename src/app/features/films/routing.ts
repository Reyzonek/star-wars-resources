import express from "express";
import { Action } from "../../../shared/http/types";

import { getFilmsActionValidation } from "./actions/get-films.action";
import { getFilmDetailsActionValidation } from "./actions/get-film-details.action";
// VALIDATION_IMPORTS

export interface FilmsRoutingDependencies {
  getFilmsAction: Action;
  getFilmDetailsAction: Action;
  // ACTIONS_IMPORTS
}

export const filmsRouting = (actions: FilmsRoutingDependencies) => {
  const router = express.Router();

  router.get("/", [getFilmsActionValidation], actions.getFilmsAction.invoke.bind(actions.getFilmsAction));
  router.get(
    "/:id",
    [getFilmDetailsActionValidation],
    actions.getFilmDetailsAction.invoke.bind(actions.getFilmDetailsAction),
  );
  // ACTIONS_SETUP

  return router;
};
