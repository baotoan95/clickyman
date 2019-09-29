package com.clickyman.listeners;

import java.io.IOException;

import javax.jms.BytesMessage;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageProducer;
import javax.jms.ObjectMessage;
import javax.jms.Session;

import org.apache.activemq.artemis.jms.client.ActiveMQObjectMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

import com.clickyman.common.constant.QueueName;
import com.clickyman.common.dto.PostEvent;
import com.clickyman.common.dto.UserDto;
import com.clickyman.common.dto.UserRequest;
import com.clickyman.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;


@Component
public class UserListener {
	@Autowired
	private UserService userService;
	@Autowired
	private ObjectMapper objectMapper;
	
	@JmsListener(destination = QueueName.REQUEST_QUEUE_GET_USER_DETAIL)
	public void fetchUserInfo(Message message, Session session) throws JMSException, IOException, ClassNotFoundException {
		UserRequest.FindUserDetailByUserName userReq = (UserRequest.FindUserDetailByUserName) ((ActiveMQObjectMessage) message).getObject();
//		BytesMessage messageIn = (BytesMessage) message;
//		byte[] data = new byte[(int) messageIn.getBodyLength()];
//		messageIn.readBytes(data);
//		ByteArrayInputStream in = new ByteArrayInputStream(data);
//	    ObjectInputStream is = new ObjectInputStream(in);
//	    UserRequest.FindUserDetailByUserName userReq = (UserRequest.FindUserDetailByUserName) is.readObject();
	    
		UserDto user = this.userService.findUserByUsername(userReq.getUsername());
		
//	    BytesMessage responseMessage = session.createBytesMessage();
//	    ByteArrayOutputStream out = new ByteArrayOutputStream();
//		ObjectOutputStream oos = new ObjectOutputStream(out);
//		oos.writeObject(user);
//		oos.flush();
//		responseMessage.writeBytes(out.toByteArray());
//		responseMessage.setJMSCorrelationID(message.getJMSCorrelationID());
		
		
		final ObjectMessage responseMessage = session.createObjectMessage();
		responseMessage.setObject(user);
		responseMessage.setJMSCorrelationID(message.getJMSCorrelationID());
		
		final MessageProducer producer = session.createProducer(message.getJMSReplyTo());
        producer.send(responseMessage);
	}
	
	@JmsListener(destination = QueueName.POST_TOPIC)
	public void postEventListener(Message message) throws JMSException, IOException, ClassNotFoundException {
		BytesMessage messageIn = (BytesMessage) message;
		byte[] data = new byte[(int) messageIn.getBodyLength()];
		messageIn.readBytes(data);
	    PostEvent postEvent = objectMapper.readValue(data, PostEvent.class);
	    this.userService.handleEvent(postEvent.getType(), postEvent.getInfo());
	}
}
