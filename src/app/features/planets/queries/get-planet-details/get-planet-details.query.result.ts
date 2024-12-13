import { QueryResult } from "@tshio/query-bus";

export class GetPlanetDetailsQueryResult implements QueryResult<any> {
  constructor(public result: any) {}
}
