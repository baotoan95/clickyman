import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {Injectable} from "@nestjs/common";
import {Request} from "express";
import {EnvironmentService} from "../modules/environment/environment.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(public readonly env: EnvironmentService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				ExtractJwt.fromAuthHeaderAsBearerToken(),
			]),
			ignoreExpiration: false,
			secretOrKey: env.ENVIRONMENT.PUBLIC_KEY,
		});
	}

	public async validate(_req: Request, _payload: any): Promise<any> {
		return true;
	}
}
