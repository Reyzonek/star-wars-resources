import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

interface PlanetEntityProps {
  id: number;
  name: string;
  diameter: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  residents: string;
  films: string[];
  url: string;
  created: string;
  edited: string;
  createdAt: string;
  updatedAt: string;
}

@Entity({
  name: "planet",
})
export class PlanetEntity {
  public static create(data: Partial<PlanetEntityProps>): PlanetEntity {
    const entity = new PlanetEntity();
    Object.assign(entity, data);
    return entity;
  }

  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  diameter: string;

  @Column()
  orbital_period: string;

  @Column()
  gravity: string;

  @Column()
  population: string;

  @Column()
  climate: string;

  @Column()
  terrain: string;

  @Column()
  surface_water: string;

  @Column()
  residents: string;

  @Column({
    type: "text",
    array: true,
  })
  films: string[];

  @Column({ unique: true })
  url: string;

  @Column()
  created: string;

  @Column()
  edited: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: string;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: string;
}
