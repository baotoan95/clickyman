export const POST_TOPIC = "POST_TOPIC";

export enum POST_INTERACTION_EVENT {
	CREATED = "CREATED",
	UPDATED = "UPDATED",
	DELETED = "DELETED",
}

export interface IPost {
	id: string;
	title: string;
	content: string;
	thumb?: string;
	author?: string;
	category?: string;
	status: POST_STATUS | POST_ERROR_STATUS;
	publishedDate?: Date;
}

export enum POST_STATUS {
	PENDING_APPROVE = "PENDING_APPROVE",
	PENDING_CONTENT_COMPLETE = "PENDING_CONTENT_COMPLETE",
	READY_TO_PUBLISH = "READY_TO_PUBLISH",
	PUBLISHED = "PUBLISHED",
	DELETED = "DELETED",
	DRAFT = "DRAFT",
}

export enum POST_ERROR_STATUS {
	AUTHOR_NOT_FOUND = "AUTHOR_NOT_FOUND",
	BAD_CONTENT = "BAD_CONTENT",
	CATEGORY_NOT_FOUND = "CATEGORY_NOT_FOUND",
}
