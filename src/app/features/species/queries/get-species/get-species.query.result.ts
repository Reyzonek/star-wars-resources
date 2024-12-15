import { QueryResult } from "@tshio/query-bus";
import { PaginationResult } from "../../../../../shared/pagination-utils/pagination-utils";
import { SpeciesEntity } from "../../models/species.entity";

export class GetSpeciesQueryResult implements QueryResult<any> {
  constructor(public result: PaginationResult<SpeciesEntity>) {}
}
