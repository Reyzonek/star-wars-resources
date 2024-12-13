import { Query } from "@tshio/query-bus";
import { TypeormMapperDTO } from "../../../../../shared/typeorm/mapper/typeorm-mapper.dto";

export const GET_PLANETS_QUERY_TYPE = "planets/GET_PLANETS";

export interface GetPlanetsQueryPayload {
  typeormMapperDTO: TypeormMapperDTO;
}

export class GetPlanetsQuery implements Query<GetPlanetsQueryPayload> {
  public type: string = GET_PLANETS_QUERY_TYPE;

  constructor(public payload: GetPlanetsQueryPayload) {}
}
