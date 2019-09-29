package com.clickyman.common.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

import com.clickyman.common.constant.SystemCode;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@SuperBuilder
@JsonInclude(Include.NON_EMPTY)
public class ExceptionDetails implements Serializable {
	private static final long serialVersionUID = 4324399358437014041L;
	private SystemCode systemCode;
	private String message;
	private String debugMessage;
	private HttpStatus status;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
	private LocalDateTime dateTime;
	
	public ExceptionDetails(SystemCode systemCode, String message, HttpStatus status, LocalDateTime dateTime) {
		this.systemCode = systemCode;
		this.message = message;
		this.status = status;
		this.dateTime = dateTime;
	}
}
