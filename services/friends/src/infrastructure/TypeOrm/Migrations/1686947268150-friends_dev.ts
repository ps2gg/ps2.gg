import { MigrationInterface, QueryRunner } from "typeorm";

export class FriendsDev1686947268150 implements MigrationInterface {
    name = 'FriendsDev1686947268150'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "friends_entity" (
                "id" text NOT NULL,
                "friend_ids" text array NOT NULL,
                CONSTRAINT "PK_cc44652ab813663991dd7578d07" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "friends_entity"
        `);
    }

}
