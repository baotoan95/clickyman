package com.clickyman;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.clickyman.exception.BaseException;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
	@ExceptionHandler(value = { BaseException.class })
	protected ResponseEntity<BaseException> handleException(BaseException ex, WebRequest request) {
		BaseException exception = BaseException.builder()
				.message(ex.getMessage())
				.debugMessage(ex.getDebugMessage())
				.build();
		return new ResponseEntity<BaseException>(exception, exception.getStatus());
	}
}
