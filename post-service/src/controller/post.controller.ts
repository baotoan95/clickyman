import {PostService} from "../services/post.service";
import {Body, Controller, Delete, Get, Param, Post, Query, UseGuards} from "@nestjs/common";
import {
	CreatePostRequestBody,
	DeletePostByIdRequest, GetPostByAuthorRequest,
	GetPostByIdRequest,
	GetPostWithPaginationRequest,
	PostDto,
} from "../dto/post.dto";
import {AuthGuard} from "@nestjs/passport";
import {PaginationDto} from "../dto/pagination.dto";

@Controller("/posts")
@UseGuards(AuthGuard())
export class PostController {
	constructor(
		private readonly postService: PostService,
	) {}

	@Post()
	public createOne(@Body() postDto: CreatePostRequestBody): Promise<PostDto> {
		return this.postService.createPost(postDto);
	}

	@Get(":id")
	public fetchOne(@Param() req: GetPostByIdRequest): Promise<PostDto | undefined> {
		return this.postService.fetchById(req);
	}

	@Delete(":id")
	public deleteOne(@Param() req: DeletePostByIdRequest): Promise<void> {
		return this.postService.deleteById(req);
	}

	@Get()
	public fetchPagination(@Query() pageReq: GetPostWithPaginationRequest): Promise<PaginationDto<PostDto>> {
		return this.postService.fetchWithPagination(pageReq);
	}

	@Get("/author/:authorId")
	public fetchByAuthorWithPagination(
		@Query() pageReq: GetPostWithPaginationRequest,
		@Param() postReq: GetPostByAuthorRequest,
	): Promise<PaginationDto<PostDto>> {
		return this.postService.fetchByAuthor(postReq, pageReq);
	}
}
