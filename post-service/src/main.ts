import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {ValidationPipe} from "@nestjs/common";
import {GlobalExceptionFilter} from "./filters/global-exception.filter";
import * as helmet from "helmet";
import * as rateLimit from "express-rate-limit";
import * as compression from "compression";

declare const module: any;

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: false,
		// logger: true,
	});

	app.useGlobalPipes(new ValidationPipe({
		transform: true,
		whitelist: true,
		forbidNonWhitelisted: true,
		forbidUnknownValues: true,
	}));
	app.useGlobalFilters(new GlobalExceptionFilter());

	app.use(helmet()); // 12 middleware security
	app.use(
		rateLimit({
			windowMs: 15 * 60 * 1000, // 15 minutes
			max: 10, // limit each IP to 100 requests per windowMs
		}),
	);
	app.use(compression()); // Compress response using gzip

	// Enable hot reload
	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}

	await app.listen(3000);
}

bootstrap();
