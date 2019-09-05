package com.clickyman.dto;

public class UserToken extends BaseToken {
	public UserToken() {
		this.setType(TokenType.USER);
	}
}
