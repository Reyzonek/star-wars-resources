import { QueryHandler } from "@tshio/query-bus";
import { Repository } from "typeorm";
import { GET_VEHICLES_QUERY_TYPE, GetVehiclesQuery, GetVehiclesQueryResult } from "../queries/get-vehicles";
import { VehicleEntity } from "../models/vehicle.entity";
import { makePaginationResult } from "../../../../shared/pagination-utils/pagination-utils";
import { CacheQuery } from "../../../../shared/cache-decorator";
import { CacheDuration } from "../../../../shared/constants/cache.constant";

export interface GetVehiclesDependencies {
  vehicleRepository: Repository<VehicleEntity>;
}
export default class GetVehiclesQueryHandler implements QueryHandler<GetVehiclesQuery, GetVehiclesQueryResult> {
  public queryType: string = GET_VEHICLES_QUERY_TYPE;

  constructor(private dependencies: GetVehiclesDependencies) {}

  @CacheQuery({ duration: CacheDuration.GET_RESOURCE_LIST })
  async execute(query: GetVehiclesQuery): Promise<GetVehiclesQueryResult> {
    const { typeormMapperDTO } = query.payload;

    const [data, total] = await this.dependencies.vehicleRepository
      .createQueryBuilder("vehicle")
      .buildQueryByTypeOrmMapper(typeormMapperDTO)
      .getManyAndCount();

    return new GetVehiclesQueryResult(makePaginationResult(data, total, typeormMapperDTO));
  }
}
