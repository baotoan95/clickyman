package com.clickyman.dto;

import java.io.Serializable;
import java.util.UUID;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import com.clickyman.constant.ValidationMessageCode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class UserDto implements Serializable {
	private static final long serialVersionUID = 1601723164384809466L;
	
	private UUID id;
	
	@NotEmpty(message = ValidationMessageCode.REQUIRED)
	private String username;
	
	@NotEmpty(message = ValidationMessageCode.REQUIRED)
	private String password;
	
	@NotEmpty(message = ValidationMessageCode.REQUIRED)
	private String fullName;
	
	@NotEmpty(message = ValidationMessageCode.REQUIRED)
	@Email(message = ValidationMessageCode.INVALID_FORMAT)
	private String email;
}
