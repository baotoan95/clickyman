package com.clickyman.services;

import java.io.IOException;
import java.util.UUID;

import javax.jms.DeliveryMode;
import javax.jms.JMSException;
import javax.jms.ObjectMessage;
import javax.jms.Session;

import org.apache.activemq.artemis.jms.client.ActiveMQQueue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsMessagingTemplate;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import com.clickyman.constant.QueueName;
import com.clickyman.dto.UserDto;
import com.clickyman.dto.UserRequest;

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
		message.setJMSReplyTo(new ActiveMQQueue(QueueName.REPLY_QUEUE_GET_USER_DETAIL));
		message.setJMSExpiration(1000L);
		message.setJMSDeliveryMode(DeliveryMode.NON_PERSISTENT);
		
		return jmsMessagingTemplate.convertSendAndReceive(new ActiveMQQueue(QueueName.REQUEST_QUEUE_GET_USER_DETAIL), message, UserDto.class);
	}
	
}
