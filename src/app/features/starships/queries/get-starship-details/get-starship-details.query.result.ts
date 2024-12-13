import { QueryResult } from "@tshio/query-bus";
import { StarshipEntity } from "../../models/starship.entity";

export class GetStarshipDetailsQueryResult implements QueryResult<any> {
  constructor(public result: StarshipEntity) {}
}
