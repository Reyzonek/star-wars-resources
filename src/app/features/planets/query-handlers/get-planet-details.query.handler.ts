import { QueryHandler } from "@tshio/query-bus";
import { Repository } from "typeorm";
import {
  GET_PLANET_DETAILS_QUERY_TYPE,
  GetPlanetDetailsQuery,
  GetPlanetDetailsQueryResult,
} from "../queries/get-planet-details";
import { PlanetEntity } from "../models/planet.entity";
import { ResourceNotFoundError } from "../../../../errors/resource-not-found.error";
import { SwapiResource } from "../../../../shared/constants/swapi-resource.enum";
import { CacheQuery } from "../../../../shared/cache-decorator";
import { CacheDuration } from "../../../../shared/constants/cache.constant";

export interface GetPlanetDetailsDependencies {
  planetRepository: Repository<PlanetEntity>;
}

export default class GetPlanetDetailsQueryHandler
  implements QueryHandler<GetPlanetDetailsQuery, GetPlanetDetailsQueryResult>
{
  constructor(private dependencies: GetPlanetDetailsDependencies) {}

  public queryType: string = GET_PLANET_DETAILS_QUERY_TYPE;

  @CacheQuery({ duration: CacheDuration.GET_RESOURCE_DETAILS })
  async execute({ payload }: GetPlanetDetailsQuery): Promise<GetPlanetDetailsQueryResult> {
    const { id } = payload;
    const planetEntity = await this.dependencies.planetRepository.findOne({
      where: { id },
    });

    if (!planetEntity) {
      throw new ResourceNotFoundError(SwapiResource.PLANETS, id);
    }

    return new GetPlanetDetailsQueryResult({ planet: planetEntity });
  }
}
