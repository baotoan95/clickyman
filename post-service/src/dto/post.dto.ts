import {IPost} from "../business/post";
import {IsDate, IsOptional, IsString} from "class-validator";
import {Exclude, Expose, Type} from "class-transformer";

@Exclude()
export class PostDto implements Partial<IPost> {
	@IsString()
	@IsOptional()
	@Expose()
	public id?: string;

	@IsString()
	@Expose()
	public title!: string;

	@IsString()
	@Expose()
	public content!: string;

	@IsString()
	@Expose()
	public thumb!: string;

	@IsString()
	@Expose()
	public author!: string;

	@IsDate()
	@Type(() => Date)
	@IsOptional()
	@Expose()
	public publishedDate?: Date;
}
