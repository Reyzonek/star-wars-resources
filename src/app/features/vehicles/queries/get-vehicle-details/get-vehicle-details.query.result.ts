import { QueryResult } from "@tshio/query-bus";
import { VehicleEntity } from "../../models/vehicle.entity";

export class GetVehicleDetailsQueryResult implements QueryResult<any> {
  constructor(public result: { vehicle: VehicleEntity }) {}
}
