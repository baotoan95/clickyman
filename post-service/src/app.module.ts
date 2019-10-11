import {Module} from "@nestjs/common";
import {TypeOrmModule, TypeOrmModuleOptions} from "@nestjs/typeorm";
import {PostEntity} from "./entities/post.entity";
import {PostController} from "./controller/post.controller";
import {PostService} from "./services/post.service";
import {JwtStrategy} from "./config/jwt.strategy";
import {EnvironmentService} from "./modules/environment/environment.service";
import {EnvironmentModule} from "./modules/environment/environment.module";
import {PassportModule} from "@nestjs/passport";
import {JwtModule, JwtModuleOptions} from "@nestjs/jwt";
import {MqModule} from "./modules/mq/mq.module";

@Module({
	imports: [
		EnvironmentModule,
		TypeOrmModule.forRootAsync({
			inject: [EnvironmentService],
			useFactory: async (
				env: EnvironmentService,
			): Promise<TypeOrmModuleOptions> => {
				return {
					type: env.ENVIRONMENT.DB_TYPE,
					host: env.ENVIRONMENT.DB_HOST,
					port: env.ENVIRONMENT.DB_PORT,
					username: env.ENVIRONMENT.DB_USER,
					password: env.ENVIRONMENT.DB_PASSWORD,
					database: env.ENVIRONMENT.DB_NAME,
					entities: [__dirname + "/**/*.entity{.ts,.js}"],
					synchronize: true,
					debug: true,
					migrationsRun: false,
					migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
					cli: {
						// Location of migration should be inside src folder
						// to be compiled into dist/ folder.
						migrationsDir: "src/migrations",
					},
				} as TypeOrmModuleOptions;
			},
		}),
		TypeOrmModule.forFeature([PostEntity]),
		PassportModule.register({defaultStrategy: "jwt"}),
		JwtModule.registerAsync({
			inject: [EnvironmentService],
			useFactory: async (
				env: EnvironmentService,
			): Promise<JwtModuleOptions> => {
				return {
					secret: env.ENVIRONMENT.PUBLIC_KEY,
					signOptions: {expiresIn: env.ENVIRONMENT.TOKEN_EXPIRE},
				};
			},
		}),
		MqModule,
	],
	controllers: [PostController],
	providers: [PostService, JwtStrategy],
})
export class AppModule {
}
