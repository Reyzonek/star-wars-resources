import { Command } from "@tshio/command-bus";

export const POST_PLANET_COMMAND_TYPE = "planets/POST_PLANET";

export interface PostPlanetCommandPayload {
  name: string;
  diameter: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  residents: string[];
  films: string[];
}

export class PostPlanetCommand implements Command<PostPlanetCommandPayload> {
  public type: string = POST_PLANET_COMMAND_TYPE;

  constructor(public payload: PostPlanetCommandPayload) {}
}
