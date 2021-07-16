import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class createAppointment1626402188666 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "apointments", //nome da tabela
        columns: [
          {
            name: "id", //por causa da função uuid o type é varchar
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "provider_id",
            type: "uuid",
          },
          {
            name: "date",
            type: "timestamp with time zone", //timestamp se não tiver no postgres
          },
          {
            name: "createat",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updateat",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
    await queryRunner.createForeignKey(
      "apointments",
      new TableForeignKey({
        name: "AppointmentProvider",
        columnNames: ["provider_id"], //recebe a chave estrageira
        referencedColumnNames: ["id"], //quem recebe a relação na outra tabela
        referencedTableName: "users", //tabela relacionada
        onDelete: "SET NULL", //o que acontece quando o usuario é deletado (RESTRICT usuario não pode ser deletado, SET NULL seta o provider_id como nullo, CASCADE deletou o usuario delete todas as relações )
        onUpdate: "CASCADE", //Se o id mudar(CASCADE)
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("apointments", "AppointmentProvider");
    await queryRunner.dropTable("apointments");
  }
}
