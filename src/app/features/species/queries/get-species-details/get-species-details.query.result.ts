import { QueryResult } from "@tshio/query-bus";
import { SpeciesEntity } from "../../models/species.entity";

export class GetSpeciesDetailsQueryResult implements QueryResult<any> {
  constructor(public result: { species: SpeciesEntity }) {}
}
