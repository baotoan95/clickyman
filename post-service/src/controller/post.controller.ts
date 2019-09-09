import {PostService} from "../services/post.service";
import {Body, Controller, Post, UseGuards} from "@nestjs/common";
import {PostDto} from "../dto/post.dto";
import {AuthGuard} from "@nestjs/passport";

@Controller("/posts")
export class PostController {
	constructor(
		private readonly postService: PostService,
	) {}

	@UseGuards(AuthGuard())
	@Post()
	public createPost(@Body() postDto: PostDto): Promise<PostDto> {
		return this.postService.createPost(postDto);
	}
}
