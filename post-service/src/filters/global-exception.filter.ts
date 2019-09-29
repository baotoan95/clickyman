import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger} from "@nestjs/common";
import {Request, Response} from "express";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	private logger = new Logger(GlobalExceptionFilter.name);

	catch(exception: any, host: ArgumentsHost): void {
		const ctx = host.switchToHttp();
		const response: Response = ctx.getResponse();
		const request: Request = ctx.getRequest();

		this.logger.error(exception);

		const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

		response.status(status).json({
			statusCode: status,
			message: exception.message,
			dateTime: new Date().toLocaleString(),
			path: request.url,
		});
	}
}
