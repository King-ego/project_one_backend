import { MigrationInterface, QueryRunner, Table } from "typeorm";
// criar migrations yarn (‘typeorm’ é um comando em algum json) migration:create -n createAppointment
// executar migrations yarn typeorm migration:run
// apagar migrations yarn typeorm migration:revert
export default class createAppointment1626357075207
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "apointments", //nome da tabela
        columns: [
          {
            name: "id", //por causa da função uuid o type é varchar
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
            isNullable: false,
          },
          {
            name: "provider",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "date",
            type: "timestamp with time zone", //timestamp se não tiver no postgres
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("apointments");
  }
}
