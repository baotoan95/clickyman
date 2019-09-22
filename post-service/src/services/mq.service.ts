import * as mqtt from "mqtt";
import {Injectable} from "@nestjs/common";

const client = mqtt.connect("mqtt://localhost:1883");

@Injectable()
export class MqService {
	constructor() {
		client.on("connect", (conn) => {
			client.subscribe("presence", (err) => {
				if (!err) {
					client.publish("presence", "Hello mqtt");
				}
			});
		});

		client.on("message", (topic, message) => {
			console.log("Message: " + message.toString() + " from " + topic);
		});
	}
}
