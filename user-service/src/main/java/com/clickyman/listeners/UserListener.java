package com.clickyman.listeners;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageProducer;
import javax.jms.ObjectMessage;
import javax.jms.Session;

import org.apache.activemq.command.ActiveMQObjectMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

import com.clickyman.constant.QueueName;
import com.clickyman.dto.UserDto;
import com.clickyman.dto.UserRequest;
import com.clickyman.services.UserService;


@Component
public class UserListener {
	@Autowired
	private UserService userService;
	
	@JmsListener(destination = QueueName.REQUEST_QUEUE_GET_USER_DETAIL)
	public void fetchUserInfo(Message message, Session session) throws JMSException {
		UserRequest.FindUserDetailByUserName req = (UserRequest.FindUserDetailByUserName) ((ActiveMQObjectMessage) message).getObject();
		UserDto user = this.userService.findUserByUsername(req.getUsername());
		
		final ObjectMessage responseMessage = new ActiveMQObjectMessage();
		responseMessage.setJMSCorrelationID(message.getJMSCorrelationID());
		responseMessage.setObject(user);
		
		final MessageProducer producer = session.createProducer(message.getJMSReplyTo());
        producer.send(responseMessage);
	}
}
