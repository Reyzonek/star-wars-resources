import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736685638134 implements MigrationInterface {
    name = 'Migration1736685638134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "planet" ALTER COLUMN "url" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "planet" ALTER COLUMN "created" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "planet" ALTER COLUMN "edited" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "planet" ADD CONSTRAINT "UQ_0c6595b668a276b8482611a20e0" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "planet" ALTER COLUMN "edited" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "planet" ALTER COLUMN "created" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "planet" ALTER COLUMN "url" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "planet" DROP CONSTRAINT "UQ_0c6595b668a276b8482611a20e0"`);
    }

}
