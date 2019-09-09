import {PostDto} from "../dto/post.dto";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {PostEntity} from "../entities/post.entity";
import {Repository} from "typeorm";
import {plainToClass} from "class-transformer";

@Injectable()
export class PostService {
	constructor(
		@InjectRepository(PostEntity) readonly postRepo: Repository<PostEntity>,
	) {}

	public async createPost(req: PostDto): Promise<PostDto> {
		const newPost: PostEntity = plainToClass(PostEntity, req);
		await this.postRepo.insert(newPost);
		return plainToClass(PostDto, newPost);
	}
}
