import { Query } from "@tshio/query-bus";
import { TypeormMapperDTO } from "../../../../../shared/typeorm/mapper/typeorm-mapper.dto";

export const GET_FILMS_QUERY_TYPE = "films/GET_FILMS";

export interface GetFilmsQueryPayload {
  typeormMapperDTO: TypeormMapperDTO;
}

export class GetFilmsQuery implements Query<GetFilmsQueryPayload> {
  public type: string = GET_FILMS_QUERY_TYPE;

  constructor(public payload: GetFilmsQueryPayload) {}
}
