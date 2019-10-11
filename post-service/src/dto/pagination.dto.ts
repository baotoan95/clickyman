import {IsArray, IsNumber, IsOptional, IsPositive, Min} from "class-validator";
import {Type} from "class-transformer";

export const DEFAULT_PAGE: number = 1;
export const DEFAULT_PAGE_SIZE: number = 10;

export class PaginationDto<T> {
	@IsArray()
	public data: T[];

	@IsNumber()
	@Type(_ => Number)
	public currentPage: number;

	@IsNumber()
	@Type(_ => Number)
	@IsOptional()
	public pageSize?: number;

	@IsNumber()
	@Type(_ => Number)
	public totalPages: number;

	constructor(
		data: T[],
		currentPage: number,
		totalItems: number,
		pageSize: number,
	) {
		this.data = data;
		this.currentPage = currentPage;
		this.pageSize = pageSize;
		this.totalPages =
			pageSize && pageSize > 0 ? Math.ceil(totalItems / pageSize) : 1;
	}
}

export class PaginationRequestDto {
	@IsNumber()
	@Min(1)
	@IsOptional()
	@IsPositive()
	@Type(_ => Number)
	public page?: number;

	@IsNumber()
	@Min(1)
	@IsPositive()
	@IsOptional()
	@Type(_ => Number)
	public size?: number;

	constructor(page?: number, size?: number) {
		this.page = page || DEFAULT_PAGE;
		this.size = size || DEFAULT_PAGE_SIZE;
	}

	public get skip(): number {
		return ((this.page || DEFAULT_PAGE) - 1) * (this.size || DEFAULT_PAGE_SIZE);
	}
}
