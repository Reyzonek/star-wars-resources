import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1733601008147 implements MigrationInterface {
    name = 'Migration1733601008147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "film" ("id" integer NOT NULL, "episode_id" integer NOT NULL, "title" character varying NOT NULL, "opening_crawl" character varying NOT NULL, "director" character varying NOT NULL, "producer" character varying NOT NULL, "release_date" TIMESTAMP NOT NULL, "url" character varying NOT NULL, "created" TIMESTAMP NOT NULL, "edited" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6116d08bd8cfaaea336c9bcffe1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "film" ADD CONSTRAINT "UQ_14db87c643265a3251c0fb683c3" UNIQUE ("url")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "film"`);
    }

}
