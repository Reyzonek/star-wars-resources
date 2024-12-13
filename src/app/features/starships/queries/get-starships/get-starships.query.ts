import { Query } from "@tshio/query-bus";
import { TypeormMapperDTO } from "../../../../../shared/typeorm/mapper/typeorm-mapper.dto";

export const GET_STARSHIPS_QUERY_TYPE = "starships/GET_STARSHIPS";

export interface GetStarshipsQueryPayload {
  typeormMapperDTO: TypeormMapperDTO;
}

export class GetStarshipsQuery implements Query<GetStarshipsQueryPayload> {
  public type: string = GET_STARSHIPS_QUERY_TYPE;

  constructor(public payload: GetStarshipsQueryPayload) {}
}
