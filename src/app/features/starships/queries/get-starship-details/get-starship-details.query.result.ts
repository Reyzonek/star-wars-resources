import { QueryResult } from "@tshio/query-bus";

export class GetStarshipDetailsQueryResult implements QueryResult<any> {
  constructor(public result: any) {}
}
