import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateInitialTables1752726565318 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "events",
        columns: [
          { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "name", type: "varchar" },
          { name: "description", type: "varchar" },
          { name: "date", type: "timestamp" },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "participants",
        columns: [
          { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "name", type: "varchar" },
          { name: "email", type: "varchar" },
          { name: "phone", type: "varchar" },
          { name: "eventId", type: "int", isNullable: true },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "participants",
      new TableForeignKey({
        columnNames: ["eventId"],
        referencedColumnNames: ["id"],
        referencedTableName: "events",
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("participants", "FK_participants_eventId_events_id");
    await queryRunner.dropTable("participants");
    await queryRunner.dropTable("events");
  }
}
