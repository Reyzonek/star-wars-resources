import { QueryResult } from "@tshio/query-bus";
import { FilmEntity } from "../../models/film.entity";

export class GetFilmDetailsQueryResult implements QueryResult<any> {
  constructor(public result: { film: FilmEntity }) {}
}
