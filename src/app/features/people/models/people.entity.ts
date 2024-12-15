import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

interface PeopleEntityProps {
  id: number;
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: string[];
  species: string[];
  starships: string[];
  vehicles: string[];
  url: string;
  created: string;
  edited: string;
  createdAt: string;
  updatedAt: string;
}

@Entity({
  name: "people",
})
export class PeopleEntity {
  public static create(data: Partial<PeopleEntityProps>): PeopleEntity {
    const entity = new PeopleEntity();
    Object.assign(entity, data);
    return entity;
  }

  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  birth_year: string;

  @Column()
  eye_color: string;

  @Column()
  gender: string;

  @Column()
  hair_color: string;

  @Column()
  height: string;

  @Column()
  mass: string;

  @Column()
  skin_color: string;

  @Column()
  homeworld: string;

  @Column({
    type: "text",
    array: true,
  })
  films: string[];

  @Column({
    type: "text",
    array: true,
  })
  species: string[];

  @Column({
    type: "text",
    array: true,
  })
  starships: string[];

  @Column({
    type: "text",
    array: true,
  })
  vehicles: string[];

  @Column({ unique: true })
  url: string;

  @Column()
  created: Date;

  @Column()
  edited: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
