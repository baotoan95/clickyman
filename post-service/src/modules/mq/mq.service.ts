import * as mqtt from "mqtt";
import {Injectable, Logger} from "@nestjs/common";
import {POST_TOPIC} from "../../business/post";
import {MqttClient} from "mqtt";
import {BaseEvent} from "../../dto/event/base-event";

export const USER_TOPIC = "USER_TOPIC";

@Injectable()
export class MqService {
	private logger = new Logger(MqService.name);
	private readonly client: MqttClient;

	constructor() {
		this.client = mqtt.connect("mqtt://localhost:1883", {
			clientId: "post-service",
			protocolId: "MQIsdp",
			protocolVersion: 3,
		});
		this.client.on("connect", () => {
			this.logger.log("Connected to MQTT server successfully");
		});
		this.client.subscribe(`multicast://${POST_TOPIC}`, (err) => {
			if (!err) {
				this.logger.log(`Connect to ${POST_TOPIC} successfully`);
			} else {
				this.logger.error(`Failed to connect to ${POST_TOPIC}`);
			}
		});
	}

	public get mqttClient(): MqttClient {
		if (!this.client.connected) {
			throw new Error("Not connected to MQTT server yet");
		}
		return this.client;
	}

	public emit(event: BaseEvent): void {
		this.mqttClient.publish(event.topic, event.message, event.publishOptions);
	}
}
