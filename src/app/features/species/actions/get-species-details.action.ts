import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { QueryBus } from "@tshio/query-bus";
import { GetSpeciesDetailsQuery } from "../queries/get-species-details";
import { Action } from "../../../../shared/http/types";

export interface GetSpeciesDetailsActionDependencies {
  queryBus: QueryBus<any>;
}

export const getSpeciesDetailsActionValidation = celebrate(
  {
    headers: Joi.object(),
    params: Joi.object().keys({
      id: Joi.number().required(),
    }),
  },
  { abortEarly: false },
);

class GetSpeciesDetailsAction implements Action {
  constructor(private dependencies: GetSpeciesDetailsActionDependencies) {}

  async invoke({ params }: Request, res: Response) {
    const queryResult = await this.dependencies.queryBus.execute(new GetSpeciesDetailsQuery({ id: Number(params.id) }));

    res.json(queryResult.result);
  }
}
export default GetSpeciesDetailsAction;
