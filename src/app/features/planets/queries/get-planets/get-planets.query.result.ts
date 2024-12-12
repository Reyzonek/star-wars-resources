import { QueryResult } from "@tshio/query-bus";

export class GetPlanetsQueryResult implements QueryResult<any> {
  constructor(public result: any) {}
}
