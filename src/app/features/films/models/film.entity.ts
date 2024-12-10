import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { SpeciesEntity } from "../../species/models/species.entity";

interface FilmEntityProps {
  id: number;
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: Date;
  species: SpeciesEntity[];
  url: string;
  created: Date;
  edited: Date;
  createdAt: Date;
  updatedAt: Date;
}

@Entity({
  name: "film",
})
export class FilmEntity {
  public static create(data: Partial<FilmEntityProps>): FilmEntity {
    const entity = new FilmEntity();
    Object.assign(entity, data);
    return entity;
  }

  @PrimaryColumn()
  id: number;

  @Column()
  episode_id: number;

  @Column()
  title: string;

  @Column()
  opening_crawl: string;

  @Column()
  director: string;

  @Column()
  producer: string;

  @Column()
  release_date: Date;

  @ManyToMany(() => SpeciesEntity, (species) => species.films)
  @JoinTable()
  species: SpeciesEntity[];

  // @Column()
  // starships: string;

  // @Column()
  // vehicles: string;

  // @Column()
  // characters: string;

  // @Column()
  // planets: string;

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
