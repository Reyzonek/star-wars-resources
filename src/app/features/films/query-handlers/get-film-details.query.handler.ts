import { QueryHandler } from "@tshio/query-bus";
import { Repository } from "typeorm";
import {
  GET_FILM_DETAILS_QUERY_TYPE,
  GetFilmDetailsQuery,
  GetFilmDetailsQueryResult,
} from "../queries/get-film-details";
import { FilmEntity } from "../models/film.entity";
import { ResourceNotFoundError } from "../../../../errors/resource-not-found.error";
import { SwapiResource } from "../../../../shared/constants/swapi-resource.enum";
import { CacheQuery } from "../../../../shared/cache-decorator";
import { CacheDuration } from "../../../../shared/constants/cache.constant";

export interface GetFilmDetailsDependencies {
  filmRepository: Repository<FilmEntity>;
}

export default class GetFilmDetailsQueryHandler
  implements QueryHandler<GetFilmDetailsQuery, GetFilmDetailsQueryResult>
{
  constructor(private dependencies: GetFilmDetailsDependencies) {}

  public queryType: string = GET_FILM_DETAILS_QUERY_TYPE;

  @CacheQuery({ duration: CacheDuration.GET_RESOURCE_DETAILS })
  async execute({ payload }: GetFilmDetailsQuery): Promise<GetFilmDetailsQueryResult> {
    const { id } = payload;
    const filmEntity = await this.dependencies.filmRepository.findOne({
      where: { id },
    });

    if (!filmEntity) {
      throw new ResourceNotFoundError(SwapiResource.FILMS, id);
    }

    return new GetFilmDetailsQueryResult(filmEntity);
  }
}
