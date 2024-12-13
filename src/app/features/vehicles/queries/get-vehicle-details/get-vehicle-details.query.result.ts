import { QueryResult } from "@tshio/query-bus";

export class GetVehicleDetailsQueryResult implements QueryResult<any> {
  constructor(public result: any) {}
}
