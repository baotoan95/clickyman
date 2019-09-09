import {Column, Entity} from "typeorm";
import {IsDate, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";
import {IPost} from "../business/post";
import {BaseEntity} from "./base.entity";

@Entity("posts")
export class PostEntity extends BaseEntity implements IPost {
	@Column()
	@IsString()
	public title!: string;

	@Column()
	@IsString()
	public content!: string;

	@Column()
	@IsString()
	public thumb!: string;

	@Column()
	@IsString()
	public author!: string;

	@Column({nullable: true})
	@IsDate()
	@Type(() => Date)
	@IsOptional()
	public publishedDate?: Date;
}
