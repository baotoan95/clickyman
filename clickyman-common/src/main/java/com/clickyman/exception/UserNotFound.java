package com.clickyman.exception;

import com.clickyman.constant.SystemCode;

public class UserNotFound extends ClickymanException {

	public UserNotFound(SystemCode systemCode, String message) {
		super(systemCode, message);
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = -1848521510256996608L;

}
