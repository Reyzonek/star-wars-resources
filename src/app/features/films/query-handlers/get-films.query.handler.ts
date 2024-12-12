import { QueryHandler } from "@tshio/query-bus";
import { Repository } from "typeorm";
import { GET_FILMS_QUERY_TYPE, GetFilmsQuery, GetFilmsQueryResult } from "../queries/get-films";
import { FilmEntity } from "../models/film.entity";
import { makePaginationResult } from "../../../../shared/pagination-utils/pagination-utils";

export interface GetFilmsDependenceis {
  filmRepository: Repository<FilmEntity>;
}

export default class GetFilmsQueryHandler implements QueryHandler<GetFilmsQuery, GetFilmsQueryResult> {
  public queryType: string = GET_FILMS_QUERY_TYPE;

  constructor(private dependencies: GetFilmsDependenceis) {}

  async execute(query: GetFilmsQuery): Promise<GetFilmsQueryResult> {
    const { typeormMapperDTO } = query.payload;

    const [data, total] = await this.dependencies.filmRepository
      .createQueryBuilder("film")
      .buildQueryByTypeOrmMapper(typeormMapperDTO)
      .getManyAndCount();

    return new GetFilmsQueryResult(makePaginationResult(data, total, typeormMapperDTO));
  }
}
