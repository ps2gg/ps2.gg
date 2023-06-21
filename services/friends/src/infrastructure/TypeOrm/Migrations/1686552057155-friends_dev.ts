import { MigrationInterface, QueryRunner } from "typeorm";

export class FriendsDev1686552057155 implements MigrationInterface {
    name = 'FriendsDev1686552057155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "friends_entity"
                RENAME COLUMN "character_id" TO "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "friends_entity"
                RENAME CONSTRAINT "PK_1cbe5ca0c1230f9d41718633251" TO "PK_cc44652ab813663991dd7578d07"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "friends_entity"
                RENAME CONSTRAINT "PK_cc44652ab813663991dd7578d07" TO "PK_1cbe5ca0c1230f9d41718633251"
        `);
        await queryRunner.query(`
            ALTER TABLE "friends_entity"
                RENAME COLUMN "id" TO "character_id"
        `);
    }

}
