import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { QueryBus } from "@tshio/query-bus";
import { GetFilmsQuery } from "../queries/get-films";
import { Action } from "../../../../shared/http/types";
import { dtoToTypeormMapper } from "../../../../shared/typeorm/mapper/dto-to-typeorm-mapper";

export interface GetFilmsActionDependencies {
  queryBus: QueryBus<any>;
}

export const getFilmsActionValidation = celebrate(
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

class GetFilmsAction implements Action {
  constructor(private dependencies: GetFilmsActionDependencies) {}

  async invoke(req: Request, res: Response) {
    const typeormMapperDTO = dtoToTypeormMapper(req);

    const queryResult = await this.dependencies.queryBus.execute(new GetFilmsQuery({ typeormMapperDTO }));

    res.json(queryResult.result);
  }
}
export default GetFilmsAction;
