import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1733861774801 implements MigrationInterface {
    name = 'Migration1733861774801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "species" ("id" integer NOT NULL, "name" character varying NOT NULL, "classification" character varying NOT NULL, "designation" character varying NOT NULL, "average_height" character varying NOT NULL, "average_lifespan" character varying NOT NULL, "eye_colors" character varying NOT NULL, "hair_colors" character varying NOT NULL, "skin_colors" character varying NOT NULL, "language" character varying NOT NULL, "homeworld" character varying, "url" character varying NOT NULL, "created" character varying NOT NULL, "edited" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_86eba64ed08b3673df47cca6555" UNIQUE ("url"), CONSTRAINT "PK_ae6a87f2423ba6c25dc43c32770" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "film_species_species" ("film_id" integer NOT NULL, "species_id" integer NOT NULL, CONSTRAINT "PK_01ded75b6e8fb7aa6b09064327e" PRIMARY KEY ("film_id", "species_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0fc502f31c9e1b62f6e6c38314" ON "film_species_species" ("film_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f24ab6fc37cb0682cc6e9ecbea" ON "film_species_species" ("species_id") `);
        await queryRunner.query(`ALTER TABLE "film_species_species" ADD CONSTRAINT "FK_0fc502f31c9e1b62f6e6c383146" FOREIGN KEY ("film_id") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "film_species_species" ADD CONSTRAINT "FK_f24ab6fc37cb0682cc6e9ecbea6" FOREIGN KEY ("species_id") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "film_species_species" DROP CONSTRAINT "FK_f24ab6fc37cb0682cc6e9ecbea6"`);
        await queryRunner.query(`ALTER TABLE "film_species_species" DROP CONSTRAINT "FK_0fc502f31c9e1b62f6e6c383146"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f24ab6fc37cb0682cc6e9ecbea"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0fc502f31c9e1b62f6e6c38314"`);
        await queryRunner.query(`DROP TABLE "film_species_species"`);
        await queryRunner.query(`DROP TABLE "species"`);
    }

}
