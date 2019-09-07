package com.clickyman.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class RequestValidateError extends ExceptionDetails {
	private static final long serialVersionUID = 7652158746552862088L;
	
	private List<PropertyError> propertyErrors;
	
}
