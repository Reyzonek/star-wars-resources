import express from "express";
import { Action } from "../../../shared/http/types";

import { getVehiclesActionValidation } from "./actions/get-vehicles.action";
// VALIDATION_IMPORTS

export interface VehiclesRoutingDependencies {
  getVehiclesAction: Action;
  // ACTIONS_IMPORTS
}

export const vehiclesRouting = (actions: VehiclesRoutingDependencies) => {
  const router = express.Router();

  router.get("/", [getVehiclesActionValidation], actions.getVehiclesAction.invoke.bind(actions.getVehiclesAction));
  // ACTIONS_SETUP

  return router;
};
