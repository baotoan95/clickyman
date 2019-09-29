package com.clickyman.common.exception;

import org.springframework.http.HttpStatus;

import com.clickyman.common.constant.SystemCode;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClickymanException extends Exception {
	private static final long serialVersionUID = 1378481497835402752L;
	private SystemCode systemCode;
	private String message;
	private String debugMessage;
	private HttpStatus status;

	public ClickymanException(SystemCode systemCode, String message) {
		this.message = message;
		this.systemCode = systemCode;
	}

	public ClickymanException(SystemCode systemCode, String message, HttpStatus status) {
		this.message = message;
		this.systemCode = systemCode;
		this.status = status;
	}
	
	public ClickymanException(SystemCode systemCode, String message, String debugMessage) {
		this.message = message;
		this.systemCode = systemCode;
		this.debugMessage = debugMessage;
	}

	public ClickymanException(SystemCode systemCode, String message, String debugMessage, HttpStatus status) {
		this.message = message;
		this.systemCode = systemCode;
		this.debugMessage = debugMessage;
		this.status = status;
	}
}
