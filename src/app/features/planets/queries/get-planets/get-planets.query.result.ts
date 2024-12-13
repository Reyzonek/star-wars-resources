import { QueryResult } from "@tshio/query-bus";
import { PlanetEntity } from "../../models/planet.entity";
import { PaginationResult } from "../../../../../shared/pagination-utils/pagination-utils";

export class GetPlanetsQueryResult implements QueryResult<any> {
  constructor(public result: PaginationResult<PlanetEntity>) {}
}
