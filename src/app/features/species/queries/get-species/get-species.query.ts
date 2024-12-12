import { Query } from "@tshio/query-bus";
import { TypeormMapperDTO } from "../../../../../shared/typeorm/mapper/typeorm-mapper.dto";

export const GET_SPECIES_QUERY_TYPE = "species/GET_SPECIES";

export interface GetSpeciesQueryPayload {
  typeormMapperDTO: TypeormMapperDTO;
}

export class GetSpeciesQuery implements Query<GetSpeciesQueryPayload> {
  public type: string = GET_SPECIES_QUERY_TYPE;

  constructor(public payload: GetSpeciesQueryPayload) {}
}
