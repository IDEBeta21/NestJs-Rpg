import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InitialMigration41732513033242 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'characters',
                columns:[
                    {
                        name: 'id',
                        isGenerated: true,
                        type: 'int',
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: true,
                        default: null,
                    },
                    {
                        name: 'hitPoints',
                        type: 'int'
                    },
                    {
                        name: 'strength',
                        type: 'int',
                    },
                    {
                        name: 'defence',
                        type: 'int',
                    },
                    {
                        name: 'intelligence',
                        type: 'int',
                    },
                    {
                        name: 'class',
                        type: 'varchar',
                    }
                ]
            }),
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('characters');
    }

}
