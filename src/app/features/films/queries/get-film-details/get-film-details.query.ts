import { Query } from "@tshio/query-bus";

export const GET_FILM_DETAILS_QUERY_TYPE = "films/GET_FILM_DETAILS";

export interface GetFilmDetailsQueryPayload {
  id: number;
}

export class GetFilmDetailsQuery implements Query<GetFilmDetailsQueryPayload> {
  public type: string = GET_FILM_DETAILS_QUERY_TYPE;

  constructor(public payload: GetFilmDetailsQueryPayload) {}
}
