import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { CommandBus } from "@tshio/command-bus";
import { StatusCodes } from "http-status-codes";
import { UpdatePlanetCommand } from "../commands/update-planet.command";
import { Action } from "../../../../shared/http/types";

export interface UpdatePlanetActionDependencies {
  commandBus: CommandBus;
}

export const updatePlanetActionValidation = celebrate(
  {
    headers: Joi.object(),
    params: Joi.object().keys({
      id: Joi.string().required(),
    }),
    body: Joi.object().keys({
      name: Joi.string().max(20).optional(),
      diameter: Joi.string().max(20).optional(),
      orbital_period: Joi.string().max(20).optional(),
      gravity: Joi.string().max(20).optional(),
      population: Joi.string().max(20).optional(),
      climate: Joi.string().max(20).optional(),
      terrain: Joi.string().max(20).optional(),
      surface_water: Joi.string().max(20).optional(),
      residents: Joi.array().items(Joi.string().optional()),
      films: Joi.array().items(Joi.string().optional()),
    }),
  },
  { abortEarly: false },
);

class UpdatePlanetAction implements Action {
  constructor(private dependencies: UpdatePlanetActionDependencies) {}

  async invoke({ body, params }: Request, res: Response) {
    const commandResult = await this.dependencies.commandBus.execute(
      new UpdatePlanetCommand({
        ...body,
        id: Number(params.id),
      }),
    );

    res.status(StatusCodes.OK).json(commandResult.planet);
  }
}
export default UpdatePlanetAction;
