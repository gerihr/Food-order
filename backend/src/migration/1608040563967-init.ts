import {MigrationInterface, QueryRunner} from "typeorm";

export class init1608040563967 implements MigrationInterface {
    name = 'init1608040563967'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "type" INT NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`INSERT INTO "user" ("name", "password", "type") VALUES ('admin', '123123', 0)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
