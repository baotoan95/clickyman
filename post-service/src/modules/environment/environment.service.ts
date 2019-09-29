import {ValueProvider} from "@nestjs/common/interfaces";
import {Global, Injectable, Logger} from "@nestjs/common";
import {IsBoolean, IsNumber, IsString, validateSync} from "class-validator";
import {plainToClass, Type} from "class-transformer";

class Environment {
	@IsNumber()
	@Type(() => Number)
	public API_PORT: number = 3000;

	@IsString()
	public DB_TYPE: string = "postgres";

	@IsNumber()
	@Type(() => Number)
	public DB_PORT: number = 5432;

	@IsString()
	@Type(() => String)
	public DB_HOST: string = "localhost";

	@IsString()
	@Type(() => String)
	public DB_NAME: string = "postgres";

	@IsString()
	@Type(() => String)
	public DB_USER: string = "postgres";

	@IsString()
	@Type(() => String)
	public DB_PASSWORD: string = "root";

	@IsString()
	public PUBLIC_KEY: string = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwoMVfbNC2RGuubwHb6jHccya/UwomaLyPOD0JLJ04lVpB2CjHRG4EXO1uJgEiyhzS1z8Ot4rB/ivoiTSRtvOQBIt3QogXUZKssYY4DE7qLCTw3cVoK8KUKNXzsQPd9KiPGid4QxWiNo2Oevz3YiJJMYKJpc9fOwRu2o6O+9vK+jr4V4KN0khwSTPa/N5EQ0cZu1AyHuObxETlwtzrgU9QwXiQKHyuSzw89saMUlZf1KUx+2EQTnyiFC4VUqroHG8g/JPX3WmskYzbCwLNrtSuTCw7Ix8Rn641t+BvkKrNLiHJ4I4DClx1G7L17aL3VAP+j/Y+qsWxIyHVMMnLe1ofwIDAQAB\n-----END PUBLIC KEY-----";

	@IsNumber()
	@Type(() => Number)
	public TOKEN_EXPIRE: number = 60;

	@Type(() => Boolean)
	@IsBoolean()
	public OTP_DEBUG_MODE: boolean = true;
}

@Global()
@Injectable()
export class EnvironmentService {

	private logger = new Logger(EnvironmentService.name);

	public readonly ENVIRONMENT: Environment;

	constructor() {
		this.ENVIRONMENT = plainToClass(Environment, {
			...new Environment(), // Include default value
			...process.env, // ENV override
		}, {excludeExtraneousValues: true});
		const res = validateSync(this.ENVIRONMENT);
		if (res.length) {
			this.logger.log(this.ENVIRONMENT);
			throw res;
		}
	}

}

export const EnvironmentProvider: ValueProvider<EnvironmentService> = {
	provide: EnvironmentService,
	useValue: new EnvironmentService(),
};
