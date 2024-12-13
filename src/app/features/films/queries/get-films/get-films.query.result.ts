import { QueryResult } from "@tshio/query-bus";
import { FilmEntity } from "../../models/film.entity";
import { PaginationResult } from "../../../../../shared/pagination-utils/pagination-utils";

export class GetFilmsQueryResult implements QueryResult<any> {
  constructor(public result: PaginationResult<FilmEntity>) {}
}
