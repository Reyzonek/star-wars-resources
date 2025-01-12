import { Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import { CommandBus } from "@tshio/command-bus";
import { StatusCodes } from "http-status-codes";
import { PostPlanetCommand } from "../commands/post-planet.command";
import { Action } from "../../../../shared/http/types";

export interface PostPlanetActionDependencies {
  commandBus: CommandBus;
}

export const postPlanetActionValidation = celebrate(
  {
    headers: Joi.object(),
    body: Joi.object().keys({
      name: Joi.string().max(20).required(),
      diameter: Joi.string().max(20).required(),
      orbital_period: Joi.string().max(20).required(),
      gravity: Joi.string().max(20).required(),
      population: Joi.string().max(20).required(),
      climate: Joi.string().max(20).required(),
      terrain: Joi.string().max(20).required(),
      surface_water: Joi.string().max(20).required(),
      residents: Joi.array().items(Joi.string().required()),
      films: Joi.array().items(Joi.string().required()),
    }),
  },
  { abortEarly: false },
);

class PostPlanetAction implements Action {
  constructor(private dependencies: PostPlanetActionDependencies) {}

  async invoke({ body }: Request, res: Response) {
    const commandResult = await this.dependencies.commandBus.execute(
      new PostPlanetCommand({
        ...body,
      }),
    );

    res.status(StatusCodes.CREATED).json(commandResult.planet);
  }
}
export default PostPlanetAction;
