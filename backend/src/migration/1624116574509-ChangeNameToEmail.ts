import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeNameToEmail1624116574509 implements MigrationInterface {
    name = 'ChangeNameToEmail1624116574509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "name" TO "email"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "email" TO "name"`);
    }

}
