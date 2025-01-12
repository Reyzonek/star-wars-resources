import { Command } from "@tshio/command-bus";

export const UPDATE_PLANET_COMMAND_TYPE = "planets/UPDATE_PLANET";

export interface UpdatePlanetCommandPayload {
  id: number;
  name?: string;
  diameter?: string;
  orbital_period?: string;
  gravity?: string;
  population?: string;
  climate?: string;
  terrain?: string;
  surface_water?: string;
  residents?: string[];
  films?: string[];
}

export class UpdatePlanetCommand implements Command<UpdatePlanetCommandPayload> {
  public type: string = UPDATE_PLANET_COMMAND_TYPE;

  constructor(public payload: UpdatePlanetCommandPayload) {}
}
