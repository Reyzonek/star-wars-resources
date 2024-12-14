import { QueryHandler } from "@tshio/query-bus";
import { Repository } from "typeorm";
import {
  GET_STARSHIP_DETAILS_QUERY_TYPE,
  GetStarshipDetailsQuery,
  GetStarshipDetailsQueryResult,
} from "../queries/get-starship-details";
import { StarshipEntity } from "../models/starship.entity";
import { ResourceNotFoundError } from "../../../../errors/resource-not-found.error";
import { SwapiResource } from "../../../../shared/constants/swapi-resource.enum";
import { CacheQuery } from "../../../../shared/cache-decorator";
import { CacheDuration } from "../../../../shared/constants/cache.constant";

export interface GetStarshipDetailsDependencies {
  starshipRepository: Repository<StarshipEntity>;
}

export default class GetStarshipDetailsQueryHandler
  implements QueryHandler<GetStarshipDetailsQuery, GetStarshipDetailsQueryResult>
{
  public queryType: string = GET_STARSHIP_DETAILS_QUERY_TYPE;

  constructor(private dependencies: GetStarshipDetailsDependencies) {}

  @CacheQuery({ duration: CacheDuration.GET_RESOURCE_DETAILS })
  async execute({ payload }: GetStarshipDetailsQuery): Promise<GetStarshipDetailsQueryResult> {
    const { id } = payload;
    const starshipEntity = await this.dependencies.starshipRepository.findOne({
      where: { id },
    });

    if (!starshipEntity) {
      throw new ResourceNotFoundError(SwapiResource.STARSHIPS, id);
    }

    return new GetStarshipDetailsQueryResult(starshipEntity);
  }
}
