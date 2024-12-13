import { QueryResult } from "@tshio/query-bus";
import { PaginationResult } from "../../../../../shared/pagination-utils/pagination-utils";
import { VehicleEntity } from "../../models/vehicle.entity";

export class GetVehiclesQueryResult implements QueryResult<any> {
  constructor(public result: PaginationResult<VehicleEntity>) {}
}
