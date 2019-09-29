package com.clickyman.services;

import java.io.IOException;
import java.util.UUID;

import javax.jms.DeliveryMode;
import javax.jms.JMSException;
import javax.jms.ObjectMessage;
import javax.jms.Session;

import org.apache.activemq.artemis.jms.client.ActiveMQDestination;
import org.apache.activemq.artemis.jms.client.ActiveMQDestination.TYPE;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsMessagingTemplate;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import com.clickyman.common.constant.QueueName;
import com.clickyman.common.dto.UserDto;
import com.clickyman.common.dto.UserRequest;

@Service
public class JmsUserSenderService {
	@Autowired
	private JmsTemplate jmsTemplate;
	@Autowired
	private JmsMessagingTemplate jmsMessagingTemplate;

	public UserDto findUserDetail(UserRequest.FindUserDetailByUserName msg) throws JMSException, IOException {
		jmsTemplate.setReceiveTimeout(20000L);
		jmsMessagingTemplate.setJmsTemplate(jmsTemplate);
		Session session = jmsMessagingTemplate.getConnectionFactory().createConnection().createSession(false, Session.AUTO_ACKNOWLEDGE);

//		BytesMessage message = session.createBytesMessage();
//		message.setJMSCorrelationID(UUID.randomUUID().toString());
//		message.setJMSReplyTo(new ActiveMQQueue(QueueName.REPLY_QUEUE_GET_USER_DETAIL));
//		message.setJMSExpiration(1000L);
//		message.setJMSDeliveryMode(DeliveryMode.NON_PERSISTENT);
//		ByteArrayOutputStream out = new ByteArrayOutputStream();
//		ObjectOutputStream oos = new ObjectOutputStream(out);
//		oos.writeObject(msg);
//		oos.flush();
//		message.writeBytes(out.toByteArray());
		ObjectMessage message = session.createObjectMessage(msg);
		message.setJMSCorrelationID(UUID.randomUUID().toString());
		message.setJMSReplyTo(ActiveMQDestination.createDestination(QueueName.REPLY_QUEUE_GET_USER_DETAIL, TYPE.TEMP_QUEUE));
		message.setJMSExpiration(1000L);
		message.setJMSDeliveryMode(DeliveryMode.NON_PERSISTENT);
		
		return jmsMessagingTemplate.convertSendAndReceive(ActiveMQDestination.createDestination(QueueName.REQUEST_QUEUE_GET_USER_DETAIL, TYPE.QUEUE), message, UserDto.class);
	}
	
}
