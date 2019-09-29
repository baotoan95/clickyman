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
public class PropertyError implements Serializable {
	private static final long serialVersionUID = -6048521300527326276L;
	private String propertyName;
	private String messageCode;
}
