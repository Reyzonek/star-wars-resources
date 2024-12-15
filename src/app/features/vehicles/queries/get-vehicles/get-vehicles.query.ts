import { Query } from "@tshio/query-bus";
import { TypeormMapperDTO } from "../../../../../shared/typeorm/mapper/typeorm-mapper.dto";

export const GET_VEHICLES_QUERY_TYPE = "vehicles/GET_VEHICLES";

export interface GetVehiclesQueryPayload {
  typeormMapperDTO: TypeormMapperDTO;
}

export class GetVehiclesQuery implements Query<GetVehiclesQueryPayload> {
  public type: string = GET_VEHICLES_QUERY_TYPE;

  constructor(public payload: GetVehiclesQueryPayload) {}
}
