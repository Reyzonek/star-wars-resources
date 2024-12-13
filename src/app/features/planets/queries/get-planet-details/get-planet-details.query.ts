import { Query } from "@tshio/query-bus";

export const GET_PLANET_DETAILS_QUERY_TYPE = "planets/GET_PLANET_DETAILS";

export interface GetPlanetDetailsQueryPayload {
  id: number;
}

export class GetPlanetDetailsQuery implements Query<GetPlanetDetailsQueryPayload> {
  public type: string = GET_PLANET_DETAILS_QUERY_TYPE;

  constructor(public payload: GetPlanetDetailsQueryPayload) {}
}
