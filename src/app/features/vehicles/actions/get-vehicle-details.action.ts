import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { QueryBus } from "@tshio/query-bus";
import { GetVehicleDetailsQuery } from "../queries/get-vehicle-details";
import { Action } from "../../../../shared/http/types";

export interface GetVehicleDetailsActionDependencies {
  queryBus: QueryBus<any>;
}

export const getVehicleDetailsActionValidation = celebrate(
  {
    headers: Joi.object(),
    params: Joi.object().keys({
      id: Joi.number().required(),
    }),
  },
  { abortEarly: false },
);

class GetVehicleDetailsAction implements Action {
  constructor(private dependencies: GetVehicleDetailsActionDependencies) {}

  async invoke({ params }: Request, res: Response) {
    const queryResult = await this.dependencies.queryBus.execute(
      new GetVehicleDetailsQuery({
        id: Number(params.id),
      }),
    );

    res.json(queryResult.result);
  }
}
export default GetVehicleDetailsAction;
