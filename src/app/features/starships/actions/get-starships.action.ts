import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { QueryBus } from "@tshio/query-bus";
import { GetStarshipsQuery } from "../queries/get-starships";
import { Action } from "../../../../shared/http/types";
import { dtoToTypeormMapper } from "../../../../shared/typeorm/mapper/dto-to-typeorm-mapper";

export interface GetStarshipsActionDependencies {
  queryBus: QueryBus<any>;
}

export const getStarshipsActionValidation = celebrate(
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

class GetStarshipsAction implements Action {
  constructor(private dependencies: GetStarshipsActionDependencies) {}

  async invoke(req: Request, res: Response) {
    const typeormMapperDTO = dtoToTypeormMapper(req);

    const queryResult = await this.dependencies.queryBus.execute(new GetStarshipsQuery({ typeormMapperDTO }));

    res.json(queryResult.result);
  }
}
export default GetStarshipsAction;
