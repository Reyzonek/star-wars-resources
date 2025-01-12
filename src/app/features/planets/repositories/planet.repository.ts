import { Repository } from "typeorm";
import { PlanetEntity } from "../models/planet.entity";
import { PlanetNotFoundError } from "../../../../errors/planet-not-found.error";

export class PlanetRepository extends Repository<PlanetEntity> {
  public async getPlanetByName(name: string): Promise<PlanetEntity | null> {
    const planetEntity = await this.findOne({
      where: { name },
    });

    return planetEntity;
  }

  public async getPlanetById(id: number): Promise<PlanetEntity> {
    const planetEntity = await this.findOne({
      where: { id },
    });

    if (!planetEntity) {
      throw new PlanetNotFoundError(id);
    }

    return planetEntity;
  }

  public async getHighestCustomPlanetId(): Promise<number | undefined> {
    const planetEntitiy = await this.createQueryBuilder("planet")
      .select("MAX(planet.id)", "id")
      .where(`id >= ${process.env.MIN_CUSTOM_PLANET_ID}`)
      .getRawOne();

    return planetEntitiy?.id;
  }
}
