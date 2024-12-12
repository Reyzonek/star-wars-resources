import { QueryResult } from "@tshio/query-bus";

export class GetFilmsQueryResult implements QueryResult<any> {
  constructor(public result: any) {}
}
