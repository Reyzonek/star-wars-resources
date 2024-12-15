import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

interface FilmEntityProps {
  id: number;
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  species: string[];
  vehicles: string[];
  characters: string[];
  starships: string[];
  planets: string[];
  url: string;
  created: string;
  edited: string;
  createdAt: string;
  updatedAt: string;
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
  release_date: string;

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

  @Column({
    type: "text",
    array: true,
  })
  characters: string[];

  @Column({
    type: "text",
    array: true,
  })
  planets: string[];

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
