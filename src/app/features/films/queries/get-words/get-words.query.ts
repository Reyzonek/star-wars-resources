import { Query } from "@tshio/query-bus";

export const GET_WORDS_QUERY_TYPE = "films/GET_WORDS";

export interface GetWordsQueryPayload {}

export class GetWordsQuery implements Query<GetWordsQueryPayload> {
  public type: string = GET_WORDS_QUERY_TYPE;

  constructor(public payload: GetWordsQueryPayload) {}
}
