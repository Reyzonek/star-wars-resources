import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

interface VehicleEntityProps {
  id: number;
  name: string;
  model: string;
  vehicle_class: string;
  manufacturer: string;
  length: string;
  cost_in_credits: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  films: string[];
  pilots: string[];
  url: string;
  created: Date;
  edited: Date;
  createdAt: Date;
  updatedAt: Date;
}

@Entity({
  name: "vehicle",
})
export class VehicleEntity {
  public static create(data: Partial<VehicleEntityProps>): VehicleEntity {
    const entity = new VehicleEntity();
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
  vehicle_class: string;

  @Column()
  manufacturer: string;

  @Column()
  length: string;

  @Column()
  cost_in_credits: string;

  @Column()
  crew: string;

  @Column()
  passengers: string;

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
  created: Date;

  @Column()
  edited: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
