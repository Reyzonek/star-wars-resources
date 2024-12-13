import { QueryResult } from "@tshio/query-bus";

export class GetFilmDetailsQueryResult implements QueryResult<any> {
  constructor(public result: any) {}
}
