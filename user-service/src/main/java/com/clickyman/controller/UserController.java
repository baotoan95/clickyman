package com.clickyman.controller;

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

import com.clickyman.constant.ApiRoutes;
import com.clickyman.constant.DefaultValue;
import com.clickyman.dto.ResponseDto;
import com.clickyman.dto.UserDto;
import com.clickyman.exception.ClickymanException;
import com.clickyman.services.UserService;

@RestController
@RequestMapping(ApiRoutes.USER_API)
public class UserController {
	@Autowired
	private UserService userService;

	@PostMapping
	@PreAuthorize("#oauth2.hasAnyScope('write')")
	public ResponseDto createUser(@Valid @RequestBody UserDto userReq) throws ClickymanException {
		return ResponseDto.build(this.userService.createUser(userReq));
	}
	
	@GetMapping("{username}")
	public ResponseDto findByUsername(@PathVariable String username) {
		return ResponseDto.build(this.userService.findUserByUsername(username));
	}
	
	@GetMapping
	public ResponseDto findAll(@RequestParam(defaultValue = DefaultValue.PAGE) int page, @RequestParam(defaultValue = DefaultValue.PAGE_SIZE) int size) {
		return ResponseDto.build(this.userService.findAllUser(page, size));
	}
	
	@DeleteMapping("{id}")
	public void delete(@PathVariable UUID id) {
		this.userService.deleteUser(id);
	}
	
	@GetMapping("checkExisting")
	public ResponseDto checkUserExisting(@RequestParam String username, @RequestParam String email) {
		return ResponseDto.build(this.userService.checkExistingUser(username, email));
	}

}
