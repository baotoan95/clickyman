package com.clickyman.services;

import java.util.UUID;

import javax.jms.DeliveryMode;
import javax.jms.JMSException;
import javax.jms.ObjectMessage;
import javax.jms.Session;

import org.apache.activemq.command.ActiveMQQueue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsMessagingTemplate;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import com.clickyman.constant.UserContant;
import com.clickyman.dto.UserDto;
import com.clickyman.dto.UserRequest;

@Service
public class JmsUserSenderService {
	@Autowired
	private JmsTemplate jmsTemplate;
	@Autowired
	private JmsMessagingTemplate jmsMessagingTemplate;
	
	public UserDto findUserDetail(UserRequest.FindUserDetailByUserName msg) throws JMSException {
		this.jmsTemplate.setReceiveTimeout(1000L);
		jmsMessagingTemplate.setJmsTemplate(jmsTemplate);
		Session session = jmsMessagingTemplate.getConnectionFactory().createConnection().createSession(false, Session.AUTO_ACKNOWLEDGE);
		ObjectMessage objectMessage = session.createObjectMessage(msg);
		objectMessage.setJMSCorrelationID(UUID.randomUUID().toString());
		objectMessage.setJMSReplyTo(new ActiveMQQueue(UserContant.REPLY_QUEUE_GET_USER_DETAIL));
		objectMessage.setJMSExpiration(1000L);
		objectMessage.setJMSDeliveryMode(DeliveryMode.NON_PERSISTENT);
		
		return jmsMessagingTemplate.convertSendAndReceive(new ActiveMQQueue(UserContant.REQUEST_QUEUE_GET_USER_DETAIL), objectMessage, UserDto.class);
	}
}
