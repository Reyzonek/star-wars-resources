import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { QueryBus } from "@tshio/query-bus";
import { GetFilmDetailsQuery } from "../queries/get-film-details";
import { Action } from "../../../../shared/http/types";

export interface GetFilmDetailsActionDependencies {
  queryBus: QueryBus<any>;
}

export const getFilmDetailsActionValidation = celebrate(
  {
    headers: Joi.object(),
    params: Joi.object().keys({
      id: Joi.number().required(),
    }),
  },
  { abortEarly: false },
);

class GetFilmDetailsAction implements Action {
  constructor(private dependencies: GetFilmDetailsActionDependencies) {}

  async invoke({ params }: Request, res: Response) {
    const queryResult = await this.dependencies.queryBus.execute(new GetFilmDetailsQuery({ id: Number(params.id) }));

    res.json(queryResult.result);
  }
}
export default GetFilmDetailsAction;
