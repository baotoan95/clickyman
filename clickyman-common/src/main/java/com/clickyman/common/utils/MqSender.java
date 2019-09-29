package com.clickyman.common.utils;

import java.io.IOException;

import javax.jms.BytesMessage;
import javax.jms.JMSException;
import javax.jms.Session;

import org.apache.activemq.artemis.jms.client.ActiveMQDestination;
import org.apache.activemq.artemis.jms.client.ActiveMQDestination.TYPE;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class MqSender {
	@Autowired
	private ObjectMapper objectMapper;
	
	public <T> void sendByteMessage(String destination, T message, JmsTemplate jmsTemplate) throws JMSException, IOException {
		Session session = jmsTemplate.getConnectionFactory().createConnection().createSession();
		BytesMessage bytesMessage = session.createBytesMessage();
		String data = objectMapper.writeValueAsString(message);
		bytesMessage.writeBytes(data.getBytes());
		jmsTemplate.convertAndSend(ActiveMQDestination.createDestination(destination, TYPE.TOPIC), bytesMessage);
	}
}
