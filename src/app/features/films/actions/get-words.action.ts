import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { QueryBus } from "@tshio/query-bus";
import { GetWordsQuery } from "../queries/get-words";
import { Action } from "../../../../shared/http/types";

export interface GetWordsActionDependencies {
  queryBus: QueryBus<any>;
}

export const getWordsActionValidation = celebrate(
  {
    headers: Joi.object(),
  },
  { abortEarly: false },
);

class GetWordsAction implements Action {
  constructor(private dependencies: GetWordsActionDependencies) {}

  async invoke(req: Request, res: Response) {
    const queryResult = await this.dependencies.queryBus.execute(new GetWordsQuery({}));

    res.json(queryResult.result);
  }
}
export default GetWordsAction;
