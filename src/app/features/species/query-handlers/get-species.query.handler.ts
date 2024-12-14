import { QueryHandler } from "@tshio/query-bus";
import { Repository } from "typeorm";
import { GET_SPECIES_QUERY_TYPE, GetSpeciesQuery, GetSpeciesQueryResult } from "../queries/get-species";
import { SpeciesEntity } from "../models/species.entity";
import { makePaginationResult } from "../../../../shared/pagination-utils/pagination-utils";
import { CacheQuery } from "../../../../shared/cache-decorator";
import { CacheDuration } from "../../../../shared/constants/cache.constant";

export interface GetSpeciesDependencies {
  speciesRepository: Repository<SpeciesEntity>;
}

export default class GetSpeciesQueryHandler implements QueryHandler<GetSpeciesQuery, GetSpeciesQueryResult> {
  public queryType: string = GET_SPECIES_QUERY_TYPE;

  constructor(private dependencies: GetSpeciesDependencies) {}

  @CacheQuery({ duration: CacheDuration.GET_RESOURCE_LIST })
  async execute(query: GetSpeciesQuery): Promise<GetSpeciesQueryResult> {
    const { typeormMapperDTO } = query.payload;

    const [data, total] = await this.dependencies.speciesRepository
      .createQueryBuilder("species")
      .buildQueryByTypeOrmMapper(typeormMapperDTO)
      .getManyAndCount();

    return new GetSpeciesQueryResult(makePaginationResult(data, total, typeormMapperDTO));
  }
}
