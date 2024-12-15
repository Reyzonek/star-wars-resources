import { AwilixContainer } from "awilix";
import { DateTime } from "luxon";
import { FilmEntity } from "../../app/features/films/models/film.entity";
import { PlanetEntity } from "../../app/features/planets/models/planet.entity";
import { SpeciesEntity } from "../../app/features/species/models/species.entity";
import { StarshipEntity } from "../../app/features/starships/models/starship.entity";
import { VehicleEntity } from "../../app/features/vehicles/models/vehicle.entity";

export class MockFactory {
  private filmsToBeMocked: FilmEntity[] = [];

  private planetsToBeMocked: PlanetEntity[] = [];

  private speciesToBeMocked: SpeciesEntity[] = [];

  private starshipsToBeMocked: StarshipEntity[] = [];

  private vehiclesToBeMocked: VehicleEntity[] = [];

  constructor(private container: AwilixContainer) {}

  public createFilms(numberOfFilms: number): FilmEntity[] {
    Array(numberOfFilms)
      .fill("")
      .forEach((item, id) => {
        this.filmsToBeMocked.push(
          FilmEntity.create({
            id,
            title: `Title #${id}`,
            episode_id: id,
            opening_crawl: `Opening #${id}`,
            director: `Director #${id}`,
            producer: `Producer #${id}`,
            release_date: DateTime.now().toISODate(),
            species: [`#${id}`],
            vehicles: [`#${id}`],
            characters: [`#${id}`],
            planets: [`#${id}`],
            starships: [`#${id}`],
            url: `Url #${id}`,
            created: DateTime.now().toISODate(),
            edited: DateTime.now().toISODate(),
          }),
        );
      });

    return this.filmsToBeMocked;
  }

  public createVehicles(numberOfVehicles: number): VehicleEntity[] {
    Array(numberOfVehicles)
      .fill("")
      .forEach((item, id) => {
        this.vehiclesToBeMocked.push(
          VehicleEntity.create({
            id,
            name: `name #${id}`,
            model: `model #${id}`,
            vehicle_class: `vehicle_class #${id}`,
            manufacturer: `manufacturer #${id}`,
            length: `length #${id}`,
            cost_in_credits: `cost_in_credits #${id}`,
            crew: `crew #${id}`,
            passengers: `passengers #${id}`,
            cargo_capacity: `cargo_capacity #${id}`,
            consumables: `consumables #${id}`,
            films: [`films #${id}`],
            pilots: [`pilots #${id}`],
            url: `Url #${id}`,
            created: DateTime.now().toISODate(),
            edited: DateTime.now().toISODate(),
          }),
        );
      });

    return this.vehiclesToBeMocked;
  }

  public createPlanets(numberOfPlanets: number): PlanetEntity[] {
    Array(numberOfPlanets)
      .fill("")
      .forEach((item, id) => {
        this.planetsToBeMocked.push(
          PlanetEntity.create({
            id,
            name: `Name ${id}`,
            diameter: `Diameter ${id}`,
            orbital_period: `Orbital period ${id}`,
            gravity: `Gravity ${id}`,
            population: ` ${id}`,
            climate: `Climate ${id}`,
            terrain: `Terrain ${id}`,
            surface_water: `Surface ${id}`,
            residents: `Residents ${id}`,
            films: [`#${id}`],
            url: `Url #${id}`,
            created: DateTime.now().toISODate(),
            edited: DateTime.now().toISODate(),
          }),
        );
      });

    return this.planetsToBeMocked;
  }

  public createSpecies(numberOfSpecies: number): SpeciesEntity[] {
    Array(numberOfSpecies)
      .fill("")
      .forEach((item, id) => {
        this.speciesToBeMocked.push(
          SpeciesEntity.create({
            id,
            name: `Name ${id}`,
            classification: `classification ${id}`,
            designation: `designation ${id}`,
            average_height: `average_height ${id}`,
            average_lifespan: `average_lifespan ${id}`,
            eye_colors: `eye_colors ${id}`,
            hair_colors: `hair_colors ${id}`,
            skin_colors: `skin_colors ${id}`,
            language: `language ${id}`,
            homeworld: `homeworld ${id}`,
            films: [`Film ${id}`],
            people: [`People ${id}`],
            url: `Url #${id}`,
            created: DateTime.now().toISODate(),
            edited: DateTime.now().toISODate(),
          }),
        );
      });

    return this.speciesToBeMocked;
  }

  public createStarships(numberOfStarships: number): StarshipEntity[] {
    Array(numberOfStarships)
      .fill("")
      .forEach((item, id) => {
        this.starshipsToBeMocked.push(
          StarshipEntity.create({
            id,
            name: `Name ${id}`,
            model: `model ${id}`,
            starship_class: `starship_class ${id}`,
            manufacturer: `manufacturer ${id}`,
            cost_in_credits: `cost_in_credits ${id}`,
            length: `length ${id}`,
            crew: `crew ${id}`,
            passengers: `passengers ${id}`,
            max_atmosphering_speed: `max_atmosphering_speed ${id}`,
            hyperdrive_rating: `hyperdrive_rating ${id}`,
            MGLT: `MGLT ${id}`,
            cargo_capacity: `cargo_capacity ${id}`,
            consumables: `consumables ${id}`,
            films: [`Film ${id}`],
            pilots: [`Name ${id}`],
            url: `Url #${id}`,
            created: DateTime.now().toISODate(),
            edited: DateTime.now().toISODate(),
          }),
        );
      });

    return this.starshipsToBeMocked;
  }

  public async insertIntoDatabase() {
    await this.container.cradle.filmRepository.save(this.filmsToBeMocked);
    await this.container.cradle.planetRepository.save(this.planetsToBeMocked);
    await this.container.cradle.speciesRepository.save(this.speciesToBeMocked);
    await this.container.cradle.vehicleRepository.save(this.vehiclesToBeMocked);
    await this.container.cradle.starshipRepository.save(this.starshipsToBeMocked);
  }

  public async clearDatabase() {
    await this.container.cradle.filmRepository.delete({});
    await this.container.cradle.planetRepository.delete({});
    await this.container.cradle.speciesRepository.delete({});
    await this.container.cradle.vehicleRepository.delete({});
    await this.container.cradle.starshipRepository.delete({});
  }
}
