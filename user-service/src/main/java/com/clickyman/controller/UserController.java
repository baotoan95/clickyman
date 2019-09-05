package com.clickyman.controller;

import java.lang.reflect.Type;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clickyman.dto.UserDto;
import com.clickyman.repositories.UserRepository;

@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ModelMapper modelMapper;

	@GetMapping
	@PreAuthorize("#oauth2.hasAnyScope('read')")
	public List<UserDto> findAll() {
		Type listUserType = new TypeToken<List<UserDto>>() {}.getType();
		return modelMapper.map(this.userRepository.findAll(), listUserType);
	}
}
