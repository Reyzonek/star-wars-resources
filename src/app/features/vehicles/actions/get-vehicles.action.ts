import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { QueryBus } from "@tshio/query-bus";
import { GetVehiclesQuery } from "../queries/get-vehicles";
import { Action } from "../../../../shared/http/types";
import { dtoToTypeormMapper } from "../../../../shared/typeorm/mapper/dto-to-typeorm-mapper";

export interface GetVehiclesActionDependencies {
  queryBus: QueryBus<any>;
}

export const getVehiclesActionValidation = celebrate(
  {
    headers: Joi.object(),
    query: Joi.object().keys({
      page: Joi.string().optional(),
      limit: Joi.string().optional(),
      sort: Joi.object().optional(),
      filter: Joi.object().optional(),
      search: Joi.string().optional(),
    }),
  },
  { abortEarly: false },
);

class GetVehiclesAction implements Action {
  constructor(private dependencies: GetVehiclesActionDependencies) {}

  async invoke(req: Request, res: Response) {
    const typeormMapperDTO = dtoToTypeormMapper(req);

    const queryResult = await this.dependencies.queryBus.execute(new GetVehiclesQuery({ typeormMapperDTO }));

    res.json(queryResult.result);
  }
}
export default GetVehiclesAction;
