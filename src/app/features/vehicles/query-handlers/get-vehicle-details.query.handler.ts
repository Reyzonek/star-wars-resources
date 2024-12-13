import { QueryHandler } from "@tshio/query-bus";
import { Repository } from "typeorm";
import {
  GET_VEHICLE_DETAILS_QUERY_TYPE,
  GetVehicleDetailsQuery,
  GetVehicleDetailsQueryResult,
} from "../queries/get-vehicle-details";
import { VehicleEntity } from "../models/vehicle.entity";
import { ResourceNotFoundError } from "../../../../errors/resource-not-found.error";
import { SwapiResource } from "../../../../shared/constants/swapi-resource.enum";
import { CacheQuery } from "../../../../shared/cache-decorator";
import { CacheDuration } from "../../../../shared/constants/cache.constant";

export interface GetVehicleDetailsDependencies {
  vehicleRepository: Repository<VehicleEntity>;
}

export default class GetVehicleDetailsQueryHandler
  implements QueryHandler<GetVehicleDetailsQuery, GetVehicleDetailsQueryResult>
{
  public queryType: string = GET_VEHICLE_DETAILS_QUERY_TYPE;

  constructor(private dependencies: GetVehicleDetailsDependencies) {}

  @CacheQuery({ duration: CacheDuration.GET_RESOURCE_DETAILS })
  async execute({ payload }: GetVehicleDetailsQuery): Promise<GetVehicleDetailsQueryResult> {
    const { id } = payload;
    const vehicleEntity = await this.dependencies.vehicleRepository.findOne({
      where: { id },
    });

    if (!vehicleEntity) {
      throw new ResourceNotFoundError(SwapiResource.VEHICLES, id);
    }
    return new GetVehicleDetailsQueryResult(vehicleEntity);
  }
}
