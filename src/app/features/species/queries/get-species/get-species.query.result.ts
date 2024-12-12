import { QueryResult } from "@tshio/query-bus";

export class GetSpeciesQueryResult implements QueryResult<any> {
  constructor(public result: any) {}
}
