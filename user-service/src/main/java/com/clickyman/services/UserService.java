package com.clickyman.services;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.jms.JMSException;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.clickyman.common.constant.ErrorMessage;
import com.clickyman.common.constant.EventType;
import com.clickyman.common.constant.QueueName;
import com.clickyman.common.constant.SystemCode;
import com.clickyman.common.dto.PostEventPayload;
import com.clickyman.common.dto.UserDto;
import com.clickyman.common.exception.ClickymanException;
import com.clickyman.common.utils.MqSender;
import com.clickyman.entities.UserEntity;
import com.clickyman.repositories.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private BCryptPasswordEncoder bCryptEncoder;
	@Autowired
	private JmsTemplate jmsTemplate;
	@Autowired
	private MqSender mqSender;

	public UserDto findUserByUsername(String username) {
		UserEntity userEntity = this.userRepo.findByUsername(username);
		if (userEntity != null) {
			return this.modelMapper.map(userEntity, UserDto.class);
		}
		return null;
	}
	
	public UserDto createUser(UserDto userReq) throws ClickymanException {
		if (checkExistingUser(userReq.getUsername(), userReq.getEmail())) {
			throw new ClickymanException(SystemCode.NOT_ALLOWED, ErrorMessage.USER_EXISTED, HttpStatus.CONFLICT);
		}
		UserEntity userEntity = this.modelMapper.map(userReq, UserEntity.class);
		userEntity.setPassword(bCryptEncoder.encode(userReq.getPassword()));
		userEntity = this.userRepo.save(userEntity);
		return this.modelMapper.map(userEntity, UserDto.class);
	}
	
	public List<UserDto> findAllUser(int page, int size) {
		Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
		Page<UserEntity> result = this.userRepo.findAll(pageable);
		return result.stream().map(userEntity -> {
			return this.modelMapper.map(userEntity, UserDto.class);
		}).collect(Collectors.toList());
	}
	
	public void deleteUser(UUID id) {
		this.userRepo.deleteById(id);
	}
	
	public boolean checkExistingUser(String username, String email) {
		return this.userRepo.findFirstByUsernameOrEmail(username, email) != null;
	}
	
	public void handleEvent(EventType type, PostEventPayload postInfo) throws JMSException, IOException {
		if (type == EventType.CREATED || type == EventType.UPDATED) {
			Optional<UserEntity> user = this.userRepo.findById(postInfo.getAuthor());
			if (!user.isPresent()) {
				this.mqSender.sendByteMessage(QueueName.USER_TOPIC, postInfo, jmsTemplate);
			}
		}
	}
	
}
