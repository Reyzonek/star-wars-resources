import { QueryHandler } from "@tshio/query-bus";
import { Repository } from "typeorm";
import {
  GET_SPECIES_DETAILS_QUERY_TYPE,
  GetSpeciesDetailsQuery,
  GetSpeciesDetailsQueryResult,
} from "../queries/get-species-details";
import { SpeciesEntity } from "../models/species.entity";
import { ResourceNotFoundError } from "../../../../errors/resource-not-found.error";
import { SwapiResource } from "../../../../shared/constants/swapi-resource.enum";
import { CacheQuery } from "../../../../shared/cache-decorator";
import { CacheDuration } from "../../../../shared/constants/cache.constant";

export interface GetSpeciesDetailsDependencies {
  speciesRepository: Repository<SpeciesEntity>;
}

export default class GetSpeciesDetailsQueryHandler
  implements QueryHandler<GetSpeciesDetailsQuery, GetSpeciesDetailsQueryResult>
{
  constructor(private dependencies: GetSpeciesDetailsDependencies) {}

  public queryType: string = GET_SPECIES_DETAILS_QUERY_TYPE;

  @CacheQuery({ duration: CacheDuration.GET_RESOURCE_DETAILS })
  async execute({ payload }: GetSpeciesDetailsQuery): Promise<GetSpeciesDetailsQueryResult> {
    const { id } = payload;
    const speciesEntity = await this.dependencies.speciesRepository.findOne({
      where: { id },
    });

    if (!speciesEntity) {
      throw new ResourceNotFoundError(SwapiResource.SPECIES, id);
    }

    return new GetSpeciesDetailsQueryResult({ species: speciesEntity });
  }
}
