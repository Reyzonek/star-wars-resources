import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { QueryBus } from "@tshio/query-bus";
import { GetPlanetDetailsQuery } from "../queries/get-planet-details";
import { Action } from "../../../../shared/http/types";

export interface GetPlanetDetailsActionDependencies {
  queryBus: QueryBus<any>;
}

export const getPlanetDetailsActionValidation = celebrate(
  {
    headers: Joi.object(),
    params: Joi.object().keys({
      id: Joi.number().required(),
    }),
  },
  { abortEarly: false },
);

class GetPlanetDetailsAction implements Action {
  constructor(private dependencies: GetPlanetDetailsActionDependencies) {}

  async invoke({ params }: Request, res: Response) {
    const queryResult = await this.dependencies.queryBus.execute(new GetPlanetDetailsQuery({ id: Number(params.id) }));

    res.json(queryResult.result);
  }
}
export default GetPlanetDetailsAction;
