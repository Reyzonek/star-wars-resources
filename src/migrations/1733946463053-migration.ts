import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1733946463053 implements MigrationInterface {
    name = 'Migration1733946463053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "species" ("id" integer NOT NULL, "name" character varying NOT NULL, "classification" character varying NOT NULL, "designation" character varying NOT NULL, "average_height" character varying NOT NULL, "average_lifespan" character varying NOT NULL, "eye_colors" character varying NOT NULL, "hair_colors" character varying NOT NULL, "skin_colors" character varying NOT NULL, "language" character varying NOT NULL, "homeworld" character varying, "people" text array NOT NULL, "films" text array NOT NULL, "url" character varying NOT NULL, "created" character varying NOT NULL, "edited" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_86eba64ed08b3673df47cca6555" UNIQUE ("url"), CONSTRAINT "PK_ae6a87f2423ba6c25dc43c32770" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vehicle" ("id" integer NOT NULL, "name" character varying NOT NULL, "model" character varying NOT NULL, "vehicle_class" character varying NOT NULL, "manufacturer" character varying NOT NULL, "length" character varying NOT NULL, "cost_in_credits" character varying NOT NULL, "crew" character varying NOT NULL, "passengers" character varying NOT NULL, "cargo_capacity" character varying NOT NULL, "consumables" character varying NOT NULL, "films" text array NOT NULL, "pilots" text array NOT NULL, "url" character varying NOT NULL, "created" TIMESTAMP NOT NULL, "edited" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b7369dba57881eb6f7b7e677b34" UNIQUE ("url"), CONSTRAINT "PK_187fa17ba39d367e5604b3d1ec9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "film" ADD "species" text array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "film" ADD "starships" text array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "film" ADD "vehicles" text array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "film" ADD "characters" text array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "film" ADD "planets" text array NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "film" DROP COLUMN "planets"`);
        await queryRunner.query(`ALTER TABLE "film" DROP COLUMN "characters"`);
        await queryRunner.query(`ALTER TABLE "film" DROP COLUMN "vehicles"`);
        await queryRunner.query(`ALTER TABLE "film" DROP COLUMN "starships"`);
        await queryRunner.query(`ALTER TABLE "film" DROP COLUMN "species"`);
        await queryRunner.query(`DROP TABLE "vehicle"`);
        await queryRunner.query(`DROP TABLE "species"`);
    }

}
