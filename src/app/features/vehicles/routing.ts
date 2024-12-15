import express from "express";
import { Action } from "../../../shared/http/types";

import { getVehiclesActionValidation } from "./actions/get-vehicles.action";
import { getVehicleDetailsActionValidation } from "./actions/get-vehicle-details.action";
// VALIDATION_IMPORTS

export interface VehiclesRoutingDependencies {
  getVehiclesAction: Action;
  getVehicleDetailsAction: Action;
  // ACTIONS_IMPORTS
}

export const vehiclesRouting = (actions: VehiclesRoutingDependencies) => {
  const router = express.Router();

  router.get("/", [getVehiclesActionValidation], actions.getVehiclesAction.invoke.bind(actions.getVehiclesAction));
  router.get(
    "/:id",
    [getVehicleDetailsActionValidation],
    actions.getVehicleDetailsAction.invoke.bind(actions.getVehicleDetailsAction),
  );
  // ACTIONS_SETUP

  return router;
};
