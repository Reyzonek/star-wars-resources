import { Query } from "@tshio/query-bus";

export const GET_STARSHIP_DETAILS_QUERY_TYPE = "starships/GET_STARSHIP_DETAILS";

export interface GetStarshipDetailsQueryPayload {
  id: number;
}

export class GetStarshipDetailsQuery implements Query<GetStarshipDetailsQueryPayload> {
  public type: string = GET_STARSHIP_DETAILS_QUERY_TYPE;

  constructor(public payload: GetStarshipDetailsQueryPayload) {}
}
