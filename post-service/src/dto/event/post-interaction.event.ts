import {BaseEvent, BaseEventRegister} from "./base-event";
import {QoS} from "mqtt";
import {IPost, POST_INTERACTION_EVENT, POST_TOPIC} from "../../business/post";
import {Exclude, Expose} from "class-transformer";
import {IsString} from "class-validator";

export class PostEvent {
	public type!: POST_INTERACTION_EVENT;
	public info!: PostEventPayload;
}

@Exclude()
export class PostEventPayload implements Partial<IPost> {
	@Expose()
	@IsString()
	public id!: string;
	@Expose()
	@IsString()
	public author!: string;
	@Expose()
	@IsString()
	public category!: string;
}

export class PostInteractionEvent extends BaseEvent {
	topic: string = POST_TOPIC;
	publishOptions = {qos: 0 as QoS};

	constructor(message: PostEvent) {
		super(JSON.stringify(message));
	}
}

export class PostEventRegister extends BaseEventRegister {
	topic = POST_TOPIC;
}
