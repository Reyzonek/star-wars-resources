import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1733947708788 implements MigrationInterface {
    name = 'Migration1733947708788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "starship" ("id" integer NOT NULL, "name" character varying NOT NULL, "model" character varying NOT NULL, "starship_class" character varying NOT NULL, "manufacturer" character varying NOT NULL, "cost_in_credits" character varying NOT NULL, "length" character varying NOT NULL, "crew" character varying NOT NULL, "passengers" character varying NOT NULL, "max_atmosphering_speed" character varying NOT NULL, "hyperdrive_rating" character varying NOT NULL, "mglt" character varying NOT NULL, "cargo_capacity" character varying NOT NULL, "consumables" character varying NOT NULL, "films" text array NOT NULL, "pilots" text array NOT NULL, "url" character varying NOT NULL, "created" character varying NOT NULL, "edited" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_398cab92a55d977f03881dda8e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "planet" ("id" integer NOT NULL, "name" character varying NOT NULL, "diameter" character varying NOT NULL, "orbital_period" character varying NOT NULL, "gravity" character varying NOT NULL, "population" character varying NOT NULL, "climate" character varying NOT NULL, "terrain" character varying NOT NULL, "surface_water" character varying NOT NULL, "residents" character varying NOT NULL, "films" text array NOT NULL, "url" character varying NOT NULL, "created" character varying NOT NULL, "edited" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cb7506671ad0f19d6287ee4bfb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "starship" ADD CONSTRAINT "UQ_0d259918a24715998d831d818c8" UNIQUE ("url")`);
        await queryRunner.query(`ALTER TABLE "planet" ADD CONSTRAINT "UQ_2681e0b8258159f67c191f29b7c" UNIQUE ("url")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "planet"`);
        await queryRunner.query(`DROP TABLE "starship"`);
        await queryRunner.query(`ALTER TABLE "planet" DROP CONSTRAINT "UQ_2681e0b8258159f67c191f29b7c"`);
        await queryRunner.query(`ALTER TABLE "starship" DROP CONSTRAINT "UQ_0d259918a24715998d831d818c8"`);
    }

}
