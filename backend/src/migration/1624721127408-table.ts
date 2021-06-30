import {MigrationInterface, QueryRunner} from "typeorm";

export class table1624721127408 implements MigrationInterface {
    name = 'table1624721127408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "status" integer NOT NULL DEFAULT '1', "city" character varying NOT NULL, "purchaserName" character varying NOT NULL, "postalNumber" integer NOT NULL, "street" character varying NOT NULL, CONSTRAINT "CHK_d467835532a0c2acded11c71b1" CHECK ("postalNumber" > 999 AND "postalNumber" < 10000), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order-item" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "meal_id" integer, "order_id" integer, CONSTRAINT "REL_9177696a07e8e3a2045b68d077" UNIQUE ("meal_id"), CONSTRAINT "PK_e06b16183c1f2f8b09f359ed572" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meal" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" double precision NOT NULL, "description" character varying NOT NULL, "long_description" character varying NOT NULL, "image_path" character varying, "orderItem_id" integer, CONSTRAINT "REL_08429e14d34836cceb48be8a26" UNIQUE ("orderItem_id"), CONSTRAINT "PK_ada510a5aba19e6bb500f8f7817" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "rating" integer NOT NULL, "userId" integer, "mealId" integer, CONSTRAINT "CHK_6d0fd2778cce670a6d4215513e" CHECK ("rating" > 0 AND "rating" <= 5), CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."email" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "order-item" ADD CONSTRAINT "FK_9177696a07e8e3a2045b68d0777" FOREIGN KEY ("meal_id") REFERENCES "meal"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order-item" ADD CONSTRAINT "FK_ce247ac6959f214f98396bddeed" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meal" ADD CONSTRAINT "FK_08429e14d34836cceb48be8a26f" FOREIGN KEY ("orderItem_id") REFERENCES "order-item"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_82813db08719e251cd0009bcbff" FOREIGN KEY ("mealId") REFERENCES "meal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_82813db08719e251cd0009bcbff"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`ALTER TABLE "meal" DROP CONSTRAINT "FK_08429e14d34836cceb48be8a26f"`);
        await queryRunner.query(`ALTER TABLE "order-item" DROP CONSTRAINT "FK_ce247ac6959f214f98396bddeed"`);
        await queryRunner.query(`ALTER TABLE "order-item" DROP CONSTRAINT "FK_9177696a07e8e3a2045b68d0777"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."email" IS NULL`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "meal"`);
        await queryRunner.query(`DROP TABLE "order-item"`);
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
