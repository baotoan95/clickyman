import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {Injectable} from "@nestjs/common";
import {Request} from "express";
import {EnvironmentService} from "../services/environment/environment.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly env: EnvironmentService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				ExtractJwt.fromAuthHeaderAsBearerToken(),
			]),
			ignoreExpiration: false,
			secretOrKey: env.ENVIRONMENT.PUBLIC_KEY,
		});
	}

	public async validate(req: Request, payload: any): Promise<any> {
		return true;
	}
}
