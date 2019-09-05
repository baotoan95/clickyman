package com.clickyman.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class UserDto implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1601723164384809466L;
	private String username;
	private String password;
}
