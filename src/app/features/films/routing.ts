import express from "express";
import { Action } from "../../../shared/http/types";

import { getFilmsActionValidation } from "./actions/get-films.action";
import { getFilmDetailsActionValidation } from "./actions/get-film-details.action";
import { getWordsActionValidation } from "./actions/get-words.action";
// VALIDATION_IMPORTS

export interface FilmsRoutingDependencies {
  getFilmsAction: Action;
  getFilmDetailsAction: Action;
  getWordsAction: Action;
  // ACTIONS_IMPORTS
}

export const filmsRouting = (actions: FilmsRoutingDependencies) => {
  const router = express.Router();

  router.get("/", [getFilmsActionValidation], actions.getFilmsAction.invoke.bind(actions.getFilmsAction));
  router.get("/words", [getWordsActionValidation], actions.getWordsAction.invoke.bind(actions.getWordsAction));
  router.get(
    "/:id",
    [getFilmDetailsActionValidation],
    actions.getFilmDetailsAction.invoke.bind(actions.getFilmDetailsAction),
  );
  // ACTIONS_SETUP

  return router;
};
