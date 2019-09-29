package com.clickyman.common.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public abstract class BaseToken {
	private String userId;
	private String username;
	private List<String> authorities;
	private TokenType type;
}
