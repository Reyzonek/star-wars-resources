import { QueryResult } from "@tshio/query-bus";
import { PaginationResult } from "../../../../../shared/pagination-utils/pagination-utils";
import { StarshipEntity } from "../../models/starship.entity";

export class GetStarshipsQueryResult implements QueryResult<any> {
  constructor(public result: PaginationResult<StarshipEntity>) {}
}
