import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

interface StarshipEntityProps {
  id: number;
  name: string;
  model: string;
  starship_class: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  films: string[];
  pilots: string[];
  url: string;
  created: string;
  edited: string;
  createdAt: string;
  updatedAt: string;
}

@Entity({
  name: "starship",
})
export class StarshipEntity {
  public static create(data: Partial<StarshipEntityProps>): StarshipEntity {
    const entity = new StarshipEntity();
    Object.assign(entity, data);
    return entity;
  }

  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column()
  starship_class: string;

  @Column()
  manufacturer: string;

  @Column()
  cost_in_credits: string;

  @Column()
  length: string;

  @Column()
  crew: string;

  @Column()
  passengers: string;

  @Column()
  max_atmosphering_speed: string;

  @Column()
  hyperdrive_rating: string;

  @Column()
  MGLT: string;

  @Column()
  cargo_capacity: string;

  @Column()
  consumables: string;

  @Column({
    type: "text",
    array: true,
  })
  films: string[];

  @Column({
    type: "text",
    array: true,
  })
  pilots: string[];

  @Column({ unique: true })
  url: string;

  @Column()
  created: string;

  @Column()
  edited: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
