import { Query } from "@tshio/query-bus";

export const GET_VEHICLE_DETAILS_QUERY_TYPE = "vehicles/GET_VEHICLE_DETAILS";

export interface GetVehicleDetailsQueryPayload {
  id: number;
}

export class GetVehicleDetailsQuery implements Query<GetVehicleDetailsQueryPayload> {
  public type: string = GET_VEHICLE_DETAILS_QUERY_TYPE;

  constructor(public payload: GetVehicleDetailsQueryPayload) {}
}
