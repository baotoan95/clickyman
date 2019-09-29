package com.clickyman.common.dto;

public class UserToken extends BaseToken {
	public UserToken() {
		this.setType(TokenType.USER);
	}
}
