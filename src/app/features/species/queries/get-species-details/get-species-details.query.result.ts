import { QueryResult } from "@tshio/query-bus";

export class GetSpeciesDetailsQueryResult implements QueryResult<any> {
  constructor(public result: any) {}
}
