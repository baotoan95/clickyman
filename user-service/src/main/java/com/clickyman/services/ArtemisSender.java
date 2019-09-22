package com.clickyman.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;

import com.clickyman.constant.QueueName;

public class ArtemisSender {
	@Autowired
	private JmsTemplate jmsTemplate;
	
	public void send(String message) {
		jmsTemplate.convertAndSend(QueueName.REQUEST_QUEUE_GET_USER_DETAIL, message);
	}
}
