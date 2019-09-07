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
import org.springframework.stereotype.Service;

import com.clickyman.dto.UserDto;
import com.clickyman.entities.UserEntity;
import com.clickyman.repositories.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private ModelMapper modelMapper;

	public UserDto findUserByUsername(String username) {
		UserEntity userEntity = this.userRepo.findByUsername(username);
		if (userEntity != null) {
			return this.modelMapper.map(userEntity, UserDto.class);
		}
		return null;
	}
	
	public UserDto createUser(UserDto userReq) {
		UserEntity userEntity = this.modelMapper.map(userReq, UserEntity.class);
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
}
