import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736710352727 implements MigrationInterface {
    name = 'Migration1736710352727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "planet" DROP COLUMN "residents"`);
        await queryRunner.query(`ALTER TABLE "planet" ADD "residents" text array NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "planet" DROP COLUMN "residents"`);
        await queryRunner.query(`ALTER TABLE "planet" ADD "residents" character varying NOT NULL`);
    }

}
