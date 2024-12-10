import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { FilmEntity } from "../../films/models/film.entity";

interface SpeciesEntityProps {
  id: number;
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  average_lifespan: string;
  eye_colors: string;
  hair_colors: string;
  skin_colors: string;
  language: string;
  homeworld: string;
  films: FilmEntity[];
  url: string;
  created: string;
  edited: string;
  createdAt: Date;
  updatedAt: Date;
}

@Entity({
  name: "species",
})
export class SpeciesEntity {
  public static create(data: Partial<SpeciesEntityProps>): SpeciesEntity {
    const entity = new SpeciesEntity();
    Object.assign(entity, data);
    return entity;
  }

  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  classification: string;

  @Column()
  designation: string;

  @Column()
  average_height: string;

  @Column()
  average_lifespan: string;

  @Column()
  eye_colors: string;

  @Column()
  hair_colors: string;

  @Column()
  skin_colors: string;

  @Column()
  language: string;

  @Column({ nullable: true })
  homeworld: string;

  // @Column()
  // people: string;

  @ManyToMany(() => FilmEntity, (film) => film.species)
  films: FilmEntity[];

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
