import {IClientPublishOptions, IClientSubscribeOptions, PacketCallback} from "mqtt";

export abstract class BaseEvent {
	public abstract topic: string;
	public packetCallback?: PacketCallback;
	public abstract publishOptions: IClientPublishOptions;

	protected constructor(public message: string | Buffer) {
	}
}

export abstract class BaseEventRegister {
	public abstract topic: string;
	public subscribeOptions?: IClientSubscribeOptions;
}
