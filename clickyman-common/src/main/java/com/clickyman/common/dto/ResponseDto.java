package com.clickyman.common.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseDto implements Serializable {
	private static final long serialVersionUID = -7376283054731032738L;
	
	private Object data;
	
	public static ResponseDto build(Object data) {
		return ResponseDto.builder().data(data).build();
	}
}
