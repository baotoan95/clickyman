package com.clickyman.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class UserRequest {
	@AllArgsConstructor
	@Setter
	@Getter
	public static class FindUserDetailByUserName implements Serializable {
		private static final long serialVersionUID = 8371299289287299812L;
		private String username;
	}
}