import { MigrationInterface, QueryRunner } from "typeorm";

export class PlayersDev1687099879754 implements MigrationInterface {
    name = 'PlayersDev1687099879754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "subscription_entity" (
                "subscription_id" text NOT NULL,
                "user_id" text NOT NULL,
                "id" text NOT NULL,
                "event_is_received" boolean NOT NULL DEFAULT false,
                "event_last_received_at" date,
                "send_after" integer,
                "send_before" integer,
                "configuration" jsonb,
                CONSTRAINT "PK_4b2ede785d0b81b370899d92175" PRIMARY KEY ("subscription_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "player_entity" (
                "id" text NOT NULL,
                "__reset_subscriptions" boolean,
                "name" text NOT NULL,
                "faction_id" text NOT NULL,
                "outfit_tag" text,
                "is_online" boolean,
                "last_logout" TIMESTAMP,
                CONSTRAINT "PK_db4a0b692e54fd8ee0247f40d0d" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_db4a0b692e54fd8ee0247f40d0" ON "player_entity" ("id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_99cc842eecdb5662679fd1efd1" ON "player_entity" ("name")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "public"."IDX_99cc842eecdb5662679fd1efd1"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_db4a0b692e54fd8ee0247f40d0"
        `);
        await queryRunner.query(`
            DROP TABLE "player_entity"
        `);
        await queryRunner.query(`
            DROP TABLE "subscription_entity"
        `);
    }

}
