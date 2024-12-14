import { QueryResult } from "@tshio/query-bus";

export class GetWordsQueryResult implements QueryResult<any> {
  constructor(public result: any) {}
}
