import { QueryResult } from "@tshio/query-bus";

export class GetVehiclesQueryResult implements QueryResult<any> {
  constructor(public result: any) {}
}
