import {IPost, POST_ERROR_STATUS, POST_STATUS} from "../business/post";
import {IsDate, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {Exclude, Expose, Type} from "class-transformer";
import {PaginationRequestDto} from "./pagination.dto";

@Exclude()
export class PostDto implements Partial<IPost> {
	@IsString()
	@Expose()
	public id!: string;

	@IsString()
	@Expose()
	public title!: string;

	@IsString()
	@Expose()
	public content!: string;

	@IsString()
	@Expose()
	@IsOptional()
	public thumb?: string;

	@IsString()
	@IsOptional()
	@Expose()
	public author?: string;

	@IsString()
	@Expose()
	public status!: POST_STATUS | POST_ERROR_STATUS;

	@IsDate()
	@Type(() => Date)
	@IsOptional()
	@Expose()
	public publishedDate?: Date;
}

@Exclude()
export class GetPostByIdRequest implements Partial<IPost> {
	@Expose()
	@IsString()
	public id!: string;
}

export class DeletePostByIdRequest extends GetPostByIdRequest {

}

@Exclude()
export class CreatePostRequestBody implements Partial<IPost> {
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
}

export class GetPostWithPaginationRequest extends PaginationRequestDto {
}

export class GetPostByAuthorRequest {
	@IsString()
	@IsNotEmpty()
	public authorId!: string;
}
