import { QueryHandler } from "@tshio/query-bus";
import { Repository } from "typeorm";
import { GET_PLANETS_QUERY_TYPE, GetPlanetsQuery, GetPlanetsQueryResult } from "../queries/get-planets";
import { PlanetEntity } from "../models/planet.entity";
import { makePaginationResult } from "../../../../shared/pagination-utils/pagination-utils";
import { CacheQuery } from "../../../../shared/cache-decorator";
import { CacheDuration } from "../../../../shared/constants/cache.constant";

export interface GetPlanetsDependencies {
  planetRepository: Repository<PlanetEntity>;
}

export default class GetPlanetsQueryHandler implements QueryHandler<GetPlanetsQuery, GetPlanetsQueryResult> {
  public queryType: string = GET_PLANETS_QUERY_TYPE;

  constructor(private dependencies: GetPlanetsDependencies) {}

  @CacheQuery({ duration: CacheDuration.GET_RESOURCE_LIST })
  async execute(query: GetPlanetsQuery): Promise<GetPlanetsQueryResult> {
    const { typeormMapperDTO } = query.payload;

    const [data, total] = await this.dependencies.planetRepository
      .createQueryBuilder("planet")
      .buildQueryByTypeOrmMapper(typeormMapperDTO)
      .getManyAndCount();

    return new GetPlanetsQueryResult(makePaginationResult(data, total, typeormMapperDTO));
  }
}
