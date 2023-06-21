import { MigrationInterface, QueryRunner } from "typeorm";

export class FriendsDev1686533738060 implements MigrationInterface {
    name = 'FriendsDev1686533738060'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "friends_entity" (
                "character_id" text NOT NULL,
                "friend_ids" text array NOT NULL,
                CONSTRAINT "PK_1cbe5ca0c1230f9d41718633251" PRIMARY KEY ("character_id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "friends_entity"
        `);
    }

}
