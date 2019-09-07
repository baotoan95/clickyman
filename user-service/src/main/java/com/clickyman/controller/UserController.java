package com.clickyman.controller;

import java.util.List;
import java.util.UUID;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clickyman.constant.DefaultValue;
import com.clickyman.dto.UserDto;
import com.clickyman.services.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
	@Autowired
	private UserService userService;

	@PostMapping
	@PreAuthorize("#oauth2.hasAnyScope('write')")
	public UserDto createUser(@Valid @RequestBody UserDto userReq) {
		return this.userService.createUser(userReq);
	}
	
	@GetMapping("/{username}")
	public UserDto findByUsername(@PathVariable String username) {
		return this.userService.findUserByUsername(username);
	}
	
	@GetMapping
	public List<UserDto> findAll(@RequestParam(defaultValue = DefaultValue.PAGE) int page, @RequestParam(defaultValue = DefaultValue.PAGE_SIZE) int size) {
		return this.userService.findAllUser(page, size);
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable UUID id) {
		this.userService.deleteUser(id);
	}

}
