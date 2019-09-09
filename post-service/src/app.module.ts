import {Module} from "@nestjs/common";
import {TypeOrmModule, TypeOrmModuleOptions} from "@nestjs/typeorm";
import {PostEntity} from "./entities/post.entity";
import {PostController} from "./controller/post.controller";
import {PostService} from "./services/post.service";
import {PassportModule} from "@nestjs/passport";
import {JwtModule, JwtModuleOptions} from "@nestjs/jwt";
import {JwtStrategy} from "./config/jwt.strategy";
import {EnvironmentService} from "./services/environment.service";
import {EnvironmentModule} from "./services/environment.module";

@Module({
	imports: [
		EnvironmentModule,
		TypeOrmModule.forRootAsync({
			inject: [EnvironmentService],
			useFactory: async (env: EnvironmentService): Promise<TypeOrmModuleOptions> => {
				return {
					type: env.ENVIRONMENT.DB_TYPE,
					host: env.ENVIRONMENT.DB_HOST,
					port: env.ENVIRONMENT.DB_PORT,
					username: env.ENVIRONMENT.DB_USER,
					password: env.ENVIRONMENT.DB_PASSWORD,
					database: env.ENVIRONMENT.DB_NAME,
					entities: [__dirname + "/**/*.entity{.ts,.js}"],
					synchronize: true,
				} as TypeOrmModuleOptions;
			},
		}),
		TypeOrmModule.forFeature([
			PostEntity,
		]),
		PassportModule.register({defaultStrategy: "jwt"}),
		JwtModule.registerAsync({
			inject: [EnvironmentService],
			useFactory: async (env: EnvironmentService): Promise<JwtModuleOptions> => {
				return {
					secret: env.ENVIRONMENT.PUBLIC_KEY,
					signOptions: {expiresIn: env.ENVIRONMENT.TOKEN_EXPIRE},
				};
			},
		}),
	],
	controllers: [PostController],
	providers: [PostService, JwtStrategy],
})
export class AppModule {
}
