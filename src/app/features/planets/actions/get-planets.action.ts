import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { QueryBus } from "@tshio/query-bus";
import { dtoToTypeormMapper } from "../../../../shared/typeorm/mapper/dto-to-typeorm-mapper";
import { GetPlanetsQuery } from "../queries/get-planets";
import { Action } from "../../../../shared/http/types";

export interface GetPlanetsActionDependencies {
  queryBus: QueryBus<any>;
}

export const getPlanetsActionValidation = celebrate(
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

class GetPlanetsAction implements Action {
  constructor(private dependencies: GetPlanetsActionDependencies) {}

  async invoke(req: Request, res: Response) {
    const typeormMapperDTO = dtoToTypeormMapper(req);

    const queryResult = await this.dependencies.queryBus.execute(new GetPlanetsQuery({ typeormMapperDTO }));

    res.json(queryResult.result);
  }
}
export default GetPlanetsAction;
