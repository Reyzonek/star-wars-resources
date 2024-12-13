import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { QueryBus } from "@tshio/query-bus";
import { GetStarshipDetailsQuery } from "../queries/get-starship-details";
import { Action } from "../../../../shared/http/types";

export interface GetStarshipDetailsActionDependencies {
  queryBus: QueryBus<any>;
}

export const getStarshipDetailsActionValidation = celebrate(
  {
    headers: Joi.object(),
    params: Joi.object().keys({
      id: Joi.number().required(),
    }),
  },
  { abortEarly: false },
);

class GetStarshipDetailsAction implements Action {
  constructor(private dependencies: GetStarshipDetailsActionDependencies) {}

  async invoke({ params }: Request, res: Response) {
    const queryResult = await this.dependencies.queryBus.execute(
      new GetStarshipDetailsQuery({
        id: Number(params.id),
      }),
    );

    res.json(queryResult.result);
  }
}
export default GetStarshipDetailsAction;
