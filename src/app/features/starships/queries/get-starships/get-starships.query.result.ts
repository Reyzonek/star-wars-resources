import { QueryResult } from "@tshio/query-bus";

export class GetStarshipsQueryResult implements QueryResult<any> {
  constructor(public result: any) {}
}
