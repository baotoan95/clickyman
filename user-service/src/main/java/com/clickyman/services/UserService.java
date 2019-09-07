package com.clickyman.services;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.clickyman.constant.ErrorMessage;
import com.clickyman.constant.SystemCode;
import com.clickyman.dto.UserDto;
import com.clickyman.entities.UserEntity;
import com.clickyman.exception.ClickymanException;
import com.clickyman.repositories.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private BCryptPasswordEncoder bCryptEncoder;

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
}
