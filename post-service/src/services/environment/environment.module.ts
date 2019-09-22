import {Global, Module} from "@nestjs/common";
import {EnvironmentProvider, EnvironmentService} from "./environment.service";

@Global()
@Module({
	providers: [EnvironmentProvider],
	exports: [EnvironmentService],
})
export class EnvironmentModule {}
