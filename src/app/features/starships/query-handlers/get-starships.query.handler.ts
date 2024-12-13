import { QueryHandler } from "@tshio/query-bus";
import { Repository } from "typeorm";
import { GET_STARSHIPS_QUERY_TYPE, GetStarshipsQuery, GetStarshipsQueryResult } from "../queries/get-starships";
import { StarshipEntity } from "../models/starship.entity";
import { makePaginationResult } from "../../../../shared/pagination-utils/pagination-utils";

export interface GetStarshipsDependencies {
  starshipRepository: Repository<StarshipEntity>;
}

export default class GetStarshipsQueryHandler implements QueryHandler<GetStarshipsQuery, GetStarshipsQueryResult> {
  public queryType: string = GET_STARSHIPS_QUERY_TYPE;

  constructor(private dependencies: GetStarshipsDependencies) {}

  async execute(query: GetStarshipsQuery): Promise<GetStarshipsQueryResult> {
    const { typeormMapperDTO } = query.payload;

    const [data, total] = await this.dependencies.starshipRepository
      .createQueryBuilder("starship")
      .buildQueryByTypeOrmMapper(typeormMapperDTO)
      .getManyAndCount();

    return new GetStarshipsQueryResult(makePaginationResult(data, total, typeormMapperDTO));
  }
}
