import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1734191680232 implements MigrationInterface {
    name = 'Migration1734191680232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "people" ("id" integer NOT NULL, "name" character varying NOT NULL, "birth_year" character varying NOT NULL, "eye_color" character varying NOT NULL, "gender" character varying NOT NULL, "hair_color" character varying NOT NULL, "height" character varying NOT NULL, "mass" character varying NOT NULL, "skin_color" character varying NOT NULL, "homeworld" character varying NOT NULL, "films" text array NOT NULL, "species" text array NOT NULL, "starships" text array NOT NULL, "vehicles" text array NOT NULL, "url" character varying NOT NULL, "created" TIMESTAMP NOT NULL, "edited" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f3d026dcae4b855e5ac3dc78349" UNIQUE ("url"), CONSTRAINT "PK_aa866e71353ee94c6cc51059c5b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "people"`);
    }

}
