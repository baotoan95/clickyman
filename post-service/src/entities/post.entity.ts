import {Column, Entity} from "typeorm";
import {IsDate, IsEnum, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";
import {IPost, POST_ERROR_STATUS, POST_STATUS} from "../business/post";
import {BaseEntity} from "./base.entity";

export const POST_TABLE_NAME = "posts";

@Entity(POST_TABLE_NAME)
export class PostEntity extends BaseEntity implements IPost {
	@Column()
	@IsString()
	public title!: string;

	@Column()
	@IsString()
	public content!: string;

	@Column({nullable: true})
	@IsString()
	@IsOptional()
	public thumb?: string;

	@Column({nullable: true})
	@IsString()
	@IsOptional()
	public author?: string;

	@Column({nullable: true})
	@IsString()
	@IsOptional()
	public category?: string;

	@Column({nullable: true})
	@IsDate()
	@Type(() => Date)
	@IsOptional()
	public publishedDate?: Date;

	@IsEnum([POST_STATUS, POST_ERROR_STATUS])
	@Column({nullable: true})
	public status!: POST_STATUS | POST_ERROR_STATUS;
}
