import { Query } from "@tshio/query-bus";

export const GET_SPECIES_DETAILS_QUERY_TYPE = "species/GET_SPECIES_DETAILS";

export interface GetSpeciesDetailsQueryPayload {
  id: number;
}

export class GetSpeciesDetailsQuery implements Query<GetSpeciesDetailsQueryPayload> {
  public type: string = GET_SPECIES_DETAILS_QUERY_TYPE;

  constructor(public payload: GetSpeciesDetailsQueryPayload) {}
}
