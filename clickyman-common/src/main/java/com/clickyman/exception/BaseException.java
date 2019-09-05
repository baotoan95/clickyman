package com.clickyman.exception;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class BaseException extends Exception {
	private static final long serialVersionUID = 4324399358437014041L;
	private String systemCode;
	private String message;
	private String debugMessage;
	private HttpStatus status;
}
