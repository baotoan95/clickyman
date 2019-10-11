import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";
import {POST_TABLE_NAME} from "../entities/post.entity";

export class PostAddCategoryColumn1569668279762 implements MigrationInterface {
	private readonly COLUMN_NAME = "category";
	private readonly NEW_COLUMNS = [
		new TableColumn({
			name: this.COLUMN_NAME,
			type: "varchar",
			isNullable: true,
		}),
	];

	public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.addColumns(POST_TABLE_NAME, this.NEW_COLUMNS);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.dropColumns(POST_TABLE_NAME, this.NEW_COLUMNS);
	}
}
