import {AfterUpdate, BeforeInsert, Column, PrimaryGeneratedColumn} from "typeorm";
import {Type} from "class-transformer";
import {IsDate} from "class-validator";

export abstract class BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	public id!: string;

	@Column()
	@Type(() => Date)
	@IsDate()
	public createdDate: Date;

	@Column()
	@Type(() => Date)
	@IsDate()
	public updatedDate: Date;

	@BeforeInsert()
	protected generateDateBeforeInsert(): void {
		this.createdDate = new Date();
		this.updatedDate = new Date();
	}

	@AfterUpdate()
	protected generateDateAfterUpdate(): void {
		this.updatedDate = new Date();
	}
}
