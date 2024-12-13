import { QueryResult } from "@tshio/query-bus";
import { PlanetEntity } from "../../models/planet.entity";

export class GetPlanetDetailsQueryResult implements QueryResult<any> {
  constructor(public result: PlanetEntity) {}
}
