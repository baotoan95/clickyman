import {
	CreatePostRequestBody,
	DeletePostByIdRequest,
	GetPostByAuthorRequest,
	GetPostByIdRequest,
	PostDto,
} from "../dto/post.dto";
import {Injectable, InternalServerErrorException, Logger} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {PostEntity} from "../entities/post.entity";
import {Repository} from "typeorm";
import {plainToClass, plainToClassFromExist} from "class-transformer";
import {PaginationDto, PaginationRequestDto} from "../dto/pagination.dto";
import {POST_ERROR_STATUS, POST_INTERACTION_EVENT, POST_STATUS} from "../business/post";
import {MqService, USER_TOPIC} from "../modules/mq/mq.service";
import {PostEvent, PostEventPayload, PostInteractionEvent} from "../dto/event/post-interaction.event";
import {validateSync} from "class-validator";
import {SYSTEM_CODE} from "../shared/system-code";

@Injectable()
export class PostService {
	private logger = new Logger(PostService.name);

	constructor(
		@InjectRepository(PostEntity) readonly postRepo: Repository<PostEntity>,
		private mqService: MqService,
	) {
		this.mqService.mqttClient.subscribe(`${USER_TOPIC}`, (err) => {
			if (!err) {
				this.logger.log(`Connect to ${USER_TOPIC} successfully`);
			} else {
				this.logger.error(`Failed to connect to ${USER_TOPIC}`);
			}
		}).on("message", (_topic, message) => {
			const postInfo: PostEventPayload = JSON.parse(message.toString("utf8"));
			this.updatePost(plainToClass(PostDto, {
				id: postInfo.id,
				status: POST_ERROR_STATUS.AUTHOR_NOT_FOUND,
			}));
		});
	}

	public async createPost(reqA: CreatePostRequestBody): Promise<PostDto> {
		const newPost: PostEntity = plainToClass(PostEntity, reqA);
		newPost.status = POST_STATUS.PENDING_CONTENT_COMPLETE;
		newPost.category = "5f5a60b5-b26c-49b2-a251-b5c3424118ac";
		// const queryRunner = getConnection().manager.getRepository(PostEntity).queryRunner;
		// await queryRunner!.startTransaction();
		await this.postRepo.insert(newPost);
		if (newPost) {
			try {
				this.dbChangedNotification(POST_INTERACTION_EVENT.CREATED, newPost);
				// await queryRunner!.commitTransaction();
			} catch (e) {
				this.logger.error(e);
				// await queryRunner!.rollbackTransaction();
				throw e;
			}
		}
		return plainToClass(PostDto, newPost);
	}

	public async fetchById(req: GetPostByIdRequest): Promise<PostDto | undefined> {
		try {
			const res = await this.postRepo.findOne({
				where: {
					id: req.id,
				},
			});
			return plainToClass(PostDto, res);
		} catch (e) {
			return undefined;
		}
	}

	public async deleteById(req: DeletePostByIdRequest): Promise<void> {
		await this.postRepo.update({
			id: req.id,
		}, {
			status: POST_STATUS.DELETED,
		});
	}

	public async fetchWithPagination(paginationReq: PaginationRequestDto): Promise<PaginationDto<PostDto>> {
		const res = await this.postRepo.findAndCount({
			skip: paginationReq.skip,
			take: paginationReq.size,
		});
		return new PaginationDto<PostDto>(res[0], paginationReq.page!, res[1], paginationReq.size!);
	}

	public async fetchByAuthor(authReq: GetPostByAuthorRequest, paginationReq: PaginationRequestDto): Promise<PaginationDto<PostDto>> {
		const res = await this.postRepo.findAndCount({
			skip: paginationReq.skip,
			take: paginationReq.size,
			where: {
				author: authReq.authorId,
			},
		});
		return new PaginationDto<PostDto>(res[0], paginationReq.page!, res[1], paginationReq.size!);
	}

	public dbChangedNotification(type: POST_INTERACTION_EVENT, entity: PostEntity): void {
		const payload = plainToClass(PostEventPayload, entity);
		const errors = validateSync(payload);
		if (errors.length) {
			this.logger.error(errors);
			throw new InternalServerErrorException(SYSTEM_CODE.LACK_OF_INFO);
		}
		const notifyPayload = new PostInteractionEvent(
			plainToClass(PostEvent, {
				type,
				info: payload,
			}),
		);
		this.mqService.emit(notifyPayload);
	}

	public async updatePost(postDto: PostDto): Promise<PostDto> {
		const oldPost = await this.postRepo.findOne({
			where: {
				id: postDto.id,
			},
		});
		const newInfo = plainToClassFromExist(oldPost, JSON.parse(JSON.stringify(postDto)));
		const newPost = plainToClass(PostEntity, newInfo);
		await this.postRepo.update({
			id: postDto.id,
		}, newPost);
		return plainToClass(PostDto, newPost);
	}
}
